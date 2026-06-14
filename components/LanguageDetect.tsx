// Inline blocking script for the NL home page only.
// Logic mirrors the original Netlify _redirects setup:
//   1. saved choice (localStorage 'azgs-lang') wins
//   2. otherwise: navigator.language starts with 'nl' → stay
//   3. otherwise → /en
const SCRIPT = `(function(){try{
var s=localStorage.getItem('azgs-lang');
if(s==='en'){location.replace('/en');return;}
if(s==='nl')return;
var l=(navigator.language||(navigator.languages&&navigator.languages[0])||'').toLowerCase();
if(l.indexOf('nl')===0){localStorage.setItem('azgs-lang','nl');return;}
localStorage.setItem('azgs-lang','en');
location.replace('/en');
}catch(e){}})();`;

export function LanguageDetect() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
