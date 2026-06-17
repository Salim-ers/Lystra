"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { cn, initials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type ThreadMessage = {
  id: string;
  fromMe: boolean;
  body: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  avatarUrl?: string;
  preview: string;
  time: string;
  unread?: number;
  messages: ThreadMessage[];
};

export function MessageThread({ conversations }: { conversations: Conversation[] }) {
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [draft, setDraft] = useState("");
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  return (
    <div className="grid h-[34rem] overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70 md:grid-cols-[18rem_1fr]">
      {/* Conversation list */}
      <div className="hidden flex-col border-r border-lystra-champagne/20 md:flex">
        <div className="border-b border-lystra-champagne/15 px-4 py-3">
          <p className="font-serif text-lg text-lystra-ink">Conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={cn(
                "flex w-full items-start gap-3 border-b border-lystra-champagne/10 px-4 py-3 text-left transition-colors",
                c.id === active?.id ? "bg-lystra-champagne/10" : "hover:bg-lystra-champagne/5",
              )}
            >
              <Avatar className="h-10 w-10 shrink-0">
                {c.avatarUrl && <AvatarImage src={c.avatarUrl} alt={c.name} />}
                <AvatarFallback className="bg-lystra-plum text-xs text-lystra-cream">
                  {initials(c.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-lystra-ink">{c.name}</p>
                  <span className="shrink-0 text-[0.7rem] text-lystra-gray">{c.time}</span>
                </div>
                <p className="truncate text-xs text-lystra-gray">{c.preview}</p>
              </div>
              {c.unread ? (
                <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-lystra-champagne px-1 text-[0.65rem] font-semibold text-lystra-ink">
                  {c.unread}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Active thread */}
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-3 border-b border-lystra-champagne/15 px-4 py-3">
          <Avatar className="h-9 w-9">
            {active?.avatarUrl && <AvatarImage src={active.avatarUrl} alt={active.name} />}
            <AvatarFallback className="bg-lystra-plum text-xs text-lystra-cream">
              {active ? initials(active.name) : "?"}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-lystra-ink">{active?.name}</p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-lystra-ivory/50 px-4 py-5">
          {active?.messages.map((m) => (
            <div key={m.id} className={cn("flex", m.fromMe ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                  m.fromMe
                    ? "rounded-br-sm bg-lystra-plum text-lystra-cream"
                    : "rounded-bl-sm border border-lystra-champagne/25 bg-white text-lystra-ink",
                )}
              >
                <p>{m.body}</p>
                <p
                  className={cn(
                    "mt-1 text-[0.65rem]",
                    m.fromMe ? "text-lystra-cream/60" : "text-lystra-gray",
                  )}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-lystra-champagne/15 p-3">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Écrivez votre message…"
            className="flex-1"
          />
          <Button size="icon" onClick={() => setDraft("")} aria-label="Envoyer">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
