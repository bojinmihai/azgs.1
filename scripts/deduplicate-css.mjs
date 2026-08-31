import fs from 'node:fs';
import postcss from 'postcss';

const file = new URL('../app/globals.css', import.meta.url);
const css = fs.readFileSync(file, 'utf8');
const root = postcss.parse(css, { from: file.pathname });
const seen = new Set();
let removed = 0;

function contextFor(node) {
  const context = [];
  for (let parent = node.parent; parent && parent.type !== 'root'; parent = parent.parent) {
    context.unshift(`${parent.type}:${parent.name ?? ''}:${parent.params ?? ''}`);
  }
  return context.join('|');
}

const rules = [];
root.walkRules((rule) => rules.push(rule));

// Keep the final identical rule in each at-rule context. This preserves the
// browser's winning cascade while removing legacy copies imported per page.
for (const rule of rules.reverse()) {
  const declarations = rule.nodes.map((node) => node.toString()).join('');
  const key = `${contextFor(rule)}|${rule.selector}|${declarations}`;
  if (seen.has(key)) {
    rule.remove();
    removed += 1;
  } else {
    seen.add(key);
  }
}

root.walkAtRules((atRule) => {
  if (atRule.nodes?.length === 0) atRule.remove();
});

fs.writeFileSync(file, root.toString());
console.log(`Removed ${removed} duplicate CSS rules.`);
