import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MessageThread, type Conversation } from "@/components/dashboard/message-thread";

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "Atelier Roselia",
    preview: "Avec plaisir ! Je vous prépare une proposition…",
    time: "10:24",
    unread: 1,
    messages: [
      { id: "m1", fromMe: true, body: "Bonjour, seriez-vous disponible le 12 septembre à Bordeaux ?", time: "09:58" },
      { id: "m2", fromMe: false, body: "Bonjour Marie ! Oui, cette date est disponible.", time: "10:10" },
      { id: "m3", fromMe: true, body: "Parfait. Nous aimerions une scénographie champêtre.", time: "10:18" },
      { id: "m4", fromMe: false, body: "Avec plaisir ! Je vous prépare une proposition détaillée d'ici demain.", time: "10:24" },
    ],
  },
  {
    id: "c2",
    name: "Lumière Studio",
    preview: "Je reviens vers vous très vite.",
    time: "Hier",
    messages: [
      { id: "m1", fromMe: true, body: "Bonjour, quelles sont vos formules pour une soirée privée ?", time: "Hier" },
      { id: "m2", fromMe: false, body: "Bonjour ! Je reviens vers vous très vite avec le détail.", time: "Hier" },
    ],
  },
  {
    id: "c3",
    name: "Éclat Traiteur",
    preview: "Merci pour votre confiance 🥂",
    time: "Lun.",
    messages: [
      { id: "m1", fromMe: false, body: "Votre réservation est confirmée. Merci pour votre confiance 🥂", time: "Lun." },
    ],
  },
];

export default function ClientMessagesPage() {
  return (
    <DashboardShell role="client" title="Messages" subtitle="Échangez avec vos talents.">
      <MessageThread conversations={CONVERSATIONS} />
    </DashboardShell>
  );
}
