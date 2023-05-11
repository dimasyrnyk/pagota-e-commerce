export interface ILink {
  href: string;
  name: string;
}

export interface ILinkList {
  title: string;
  links: ILink[];
}

export const LINKSLIST: ILinkList[] = [
  {
    title: "Get in touch",
    links: [
      { href: "#", name: "About Us" },
      { href: "#", name: "Careers" },
      { href: "#", name: "Press Releases" },
      { href: "#", name: "Blog" },
    ],
  },
  {
    title: "Connections",
    links: [
      { href: "#", name: "Facebook" },
      { href: "#", name: "Twitter" },
      { href: "#", name: "Instagram" },
      { href: "#", name: "Youtube" },
      { href: "#", name: "LinkedIn" },
    ],
  },
  {
    title: "Earnings",
    links: [
      { href: "#", name: "Become an Affilate" },
      { href: "#", name: "Advertise your product" },
      { href: "#", name: "Sell on Market" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "#", name: "Your account" },
      { href: "#", name: "Returns Center" },
      { href: "#", name: "100% purchase protection" },
      { href: "#", name: "Chat with us" },
      { href: "#", name: "Help" },
    ],
  },
];
