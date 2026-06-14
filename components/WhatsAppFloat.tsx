import { COMPANY } from '@/lib/site';
import { WhatsAppIcon } from './icons';

export function WhatsAppFloat({ label }: { label: string }) {
  return (
    <a
      href={`https://wa.me/${COMPANY.whatsapp}`}
      className="whatsapp-float"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
    </a>
  );
}
