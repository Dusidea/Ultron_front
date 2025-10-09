import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Banner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-medium-purple-300 rounded-2xl shadow-sm">
      <p className=" text-medium-purple-950 text-lg font-semibold mb-2">
        Bienvenue sur TwitchCapsule !
      </p>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm  text-medium-purple-950 font-medium hover:text-purple-900 transition"
      >
        <span>{isOpen ? "Fermer" : "En savoir plus"}</span>
        <ChevronDown
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-sm  text-medium-purple-950 space-y-2">
          <p>
            Cette application vise à aider les streamers de la plateforme Twitch
            à analyser la "concurrence" au sein des catégories Twitch.
          </p>
          <p>
            Chaque live est étiqueté par une catégorie correspondant en général
            à l'identifiant d'un jeu vidéo mais également à des thématiques
            telles que "musique", "art", "discussion". Twitch permet de
            visualiser la liste des chaines qui sont en live au sein d'une
            catégorie donnée à un instant T mais ne fournit pas d'historique des
            catégories.
          </p>
          <p>
            L'objectif de cette interface est de vous permettre de revisiter
            l'état d'une catégorie dans le passé. Un passé qui commence en
            septembre 2025 dans notre cas.
          </p>
          <p>
            L'application consomme l'API Twitch pour obtenir la liste des
            chaines au sein d'une catégorie toutes les 5 minutes. Elle stocke
            ensuite ces données en base et fournit ses propres routes API pour
            permettre leur interrogation.
          </p>
        </div>
      </div>
    </div>
  );
}
