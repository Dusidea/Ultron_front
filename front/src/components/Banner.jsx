export default function Banner() {
  return (
    <>
      <p>Bienvenue sur TwitchStats ! </p>
      <p>
        Cette application vise à aider les streamers de la plateforme Twitch à
        analyser la "concurrence" au sein des catégories Twitch.
      </p>
      <p>
        Chaque live est étiqueté par une catégorie correspondant en général à
        l'identifiant d'un jeu vidéo mais également à des thématiques telles que
        "musique", "art", "discussion".{" "}
      </p>
      <p>
        Twitch permet de visualiser la liste des chaines qui sont en live au
        sein d'une catégorie donnée à un instant T mais ne fournit pas
        d'historique des catégories{" "}
      </p>
      <p>
        L'application consomme l'API Twich pour obtenir la liste des chaines au
        sein d'une catégorie (avec leur nombre de viewer, le nom de la chaine,
        la langue, etc) toutes les 5 minutes
      </p>
      <p>
        Elle stocke ensuite ces données en base de données et fournit ses
        propres routes API pour permettre l'interrogation de ces bases.{" "}
      </p>
      <p>
        L'objectif de cette interface est de vous permettre de visualiser les
        données sous forme de graphes{" "}
      </p>
      <p>
        A long terme, un role admin permettra d'administrer les catégories
        Twitch consultables.{" "}
      </p>
    </>
  );
}
