export type NavLink = {
  id: string;
  label: string;
};

export type SocialLink = {
  name: "GitHub" | "LinkedIn" | "Email" | "YouTube" | "WhatsApp";
  url: string;
  handle: string;
};

export type Profile = {
  firstName: string;
  lastName: string;
  fullName: string;
  initials: string;
  greeting: string;
  role: string;
  headline: string;
  specialties: string[];
  location: string;
  badge: { label: string; value: string };
  photo: { src: string; alt: string };
  cvUrl: string;
  email: string;
  socials: SocialLink[];
};

export type ProjectCategory =
  | "web"
  | "mobile"
  | "smartwatch"
  | "desktop"
  | "game"
  | "ai";

// The device each project is shown on.
export type DeviceKind = "phone" | "watch" | "desktop" | "console";

export type ProjectLink = {
  label: string;
  url: string;
};

// Short muted demo loop shown inside the device frame.
export type ProjectVideo = {
  webm: string;
  mp4: string;
  poster: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  tags: string[];
  year: string;
  device: DeviceKind;
  // App logo shown on the strip and thumbnails. "icon" is a square app icon,
  // "wordmark" a wide title logo. Without it, "cover" or a CSS cover is drawn.
  logo?: { src: string; alt: string; kind: "icon" | "wordmark" };
  // Optional vertical image for the strip instead of the logo.
  cover?: { src: string; alt: string };
  // Brand color behind the logo (and of the CSS cover).
  tint: string;
  video?: ProjectVideo;
  image?: { src: string; alt: string };
  github: string;
  demo: ProjectLink;
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  photo?: string;
};

export type TimelineItem = {
  id: string;
  title: string;
  place: string;
  period: string;
  description: string;
  tags?: string[];
};

export type Language = {
  id: string;
  greeting: string;
  name: string;
  level: string;
  note: string;
};

export type InterestIcon = "fun" | "sports" | "games" | "music" | "security" | "ai";

export type Interest = {
  id: string;
  label: string;
  detail: string;
  icon: InterestIcon;
};

// Where the studies are heading ("Hacia dónde voy").
export type FocusArea = {
  id: string;
  title: string;
  description: string;
  icon: InterestIcon;
};

export type GalleryItem = {
  id: string;
  caption: string;
  image?: { src: string; alt: string };
  // Natural shape of the photo, used by the scattered gallery.
  shape: "tall" | "wide" | "square";
};

