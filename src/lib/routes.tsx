import {
  IconCardStack,
  IconClosedEye,
  IconEnter,
  IconExit,
  IconHeart,
  IconHome,
  IconListBullet,
  IconPencil,
  IconPlus,
  IconRocket,
  IconUser,
} from "@/components/common/icons";

const appName = "Casa Kind";

interface AppRoute {
  key: string;
  icon?: React.ReactNode;
  title: string;
  href: string;
  description?: string;
}

const homeBase: AppRoute = {
  key: "home",
  icon: <IconHome />,
  title: "Home",
  href: "/home",
  description: "Home base for self-care",
};

const journal: AppRoute = {
  key: "journal",
  icon: <IconPencil />,
  title: "Journal",
  href: "/journal",
  description: "Create space to reflect",
};

const journalPrompts: AppRoute = {
  key: "journal-prompts",
  icon: <IconCardStack />,
  title: "Prompts",
  href: "/journal/prompts",
};

const journalEntry: AppRoute = {
  key: "journal-entry",
  title: "Entry",
  href: "/journal/entry",
};

const journalEntries: AppRoute = {
  key: "journal-entries",
  icon: <IconListBullet />,
  title: "Entries",
  href: "/journal/entries",
};

const journalNewEntry: AppRoute = {
  key: "journal-new-entry",
  icon: <IconPlus />,
  title: "New Entry",
  href: "/journal/entry/new",
};

const heartTalk: AppRoute = {
  key: "heart-talk",
  icon: <IconHeart />,
  title: "Heart Talk",
  href: "/heart-talk",
  description: "Explore through conversation",
};

const meditate: AppRoute = {
  key: "meditate",
  icon: <IconClosedEye />,
  title: "Meditate",
  href: "/meditate",
  description: "Focus on the breath",
};

const account: AppRoute = {
  key: "account",
  icon: <IconUser />,
  title: "Account",
  href: "/account",
};

const signOut: AppRoute = {
  key: "sign-out",
  icon: <IconExit />,
  href: "",
  title: "Sign Out",
};

const signIn: AppRoute = {
  key: "sign-in",
  icon: <IconEnter />,
  title: "Sign In",
  href: "/sign-in",
};

const signUp: AppRoute = {
  key: "sign-up",
  icon: <IconRocket />,
  title: "Sign Up",
  href: "/sign-up",
};

export type { AppRoute };
export {
  appName,
  homeBase,
  journal,
  journalEntries,
  journalEntry,
  journalPrompts,
  journalNewEntry,
  heartTalk,
  meditate,
  account,
  signIn,
  signOut,
  signUp,
};
