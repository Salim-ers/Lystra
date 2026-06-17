import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MessageThread, type Conversation } from "@/components/dashboard/message-thread";

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "Marie Lambert",
    preview: "Parfait, j'attends votre proposition !",
    time: "10:26",
    unread: 2,
    messages: [
      { id: "m1", fromMe: false, body: "Bonjour, seriez-vous disponible le 12 septembre à Bordeaux ?", time: "09:58" },
      { id: "m2", fromMe: true, body: "Bonjour Marie ! Oui, cette date est disponible.", time: "10:10" },
      { id: "m3", fromMe: false, body: "Nous aimerions une scénographie champêtre.", time: "10:18" },
      { id: "m4", fromMe: true, body: "Avec plaisir ! Je vous prépare une proposition d'ici demain.", time: "10:24" },
      { id: "m5", fromMe: false, body: "Parfait, j'attends votre proposition !", time: "10:26" },
    ],
  },
  {
    id: "c2",
    name: "Thomas Renaud",
    preview: "Merci, je regarde le devis ce soir.",
    time: "Hier",
    messages: [
      { id: "m1", fromMe: true, body: "Voici le devis pour votre dîner d'anniversaire.", time: "Hier" },
      { id: "m2", fromMe: false, body: "Merci, je regarde le devis ce soir.", time: "Hier" },
    ],
  },
  {
    id: "c3",
    name: "Sophie Marchand",
    preview: "Hâte de travailler avec vous !",
    time: "Mar.",
    messages: [
      { id: "m1", fromMe: false, body: "Réservation confirmée. Hâte de travailler avec vous !", time: "Mar." },
    ],
  },
];

export default function VendorMessagesPage() {
  return (
    <DashboardShell role="vendor" title="Messages" subtitle="Échangez avec vos clients." userName="Atelier Roselia">
      <MessageThread conversations={CONVERSATIONS} />
    </DashboardShell>
  );
}
