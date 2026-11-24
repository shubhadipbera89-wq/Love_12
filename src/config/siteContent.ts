export interface MemoryCard {
  id: string;
  imageUrl: string;
  caption: string;
  subtitle: string;
  date?: string;
}

export interface SpecialReason {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  fullMessage: string;
}

export interface SiteContent {
  targetName: string;
  senderName: string;
  
  // Screen 1: Welcome
  welcome: {
    badgeText: string;
    heading: string;
    subtitle: string;
    buttonText: string;
  };

  // Screen 2: Personal Message
  personalMessage: {
    heading: string;
    lines: string[];
    buttonText: string;
  };

  // Screen 3: Memories Gallery
  memories: {
    heading: string;
    subheading: string;
    photos: MemoryCard[];
    buttonText: string;
  };

  // Screen 4: Special Question Readiness
  specialQuestion: {
    heading: string;
    subheading: string;
    yesButtonText: string;
    maybeButtonText: string;
  };

  // Screen 5: Love Code Poem & Forever Partner Proposal
  lovePoem: {
    title: string;
    terminalTitle: string;
    paragraphs: string[];
    question: string;
    yesButtonText: string;
    noButtonText: string;
    connectionEstablished: string;
    connectionSuccess: string;
    loveRevealText: string;
    noDodges: string[];
    continueButtonText: string;
  };

  // Legacy/Alternative Proposal (kept for flexibility)
  proposal: {
    preText: string;
    question: string;
    yesButtonText: string;
    noButtonText: string;
    yesResponseHeading: string;
    yesResponseSubtitle: string;
    noDodges: string[];
    continueButtonText: string;
  };

  // Screen 6: Love Letter
  loveLetter: {
    envelopePrompt: string;
    openButtonText: string;
    title: string;
    paragraphs: {
      id: string;
      text: string;
      isHighlight?: boolean;
      highlightType?: 'commit' | 'love' | 'teammate' | 'code';
    }[];
    signaturePrefix: string;
    signature: string;
    continueButtonText: string;
  };

  // Screen 7: Big Reveal
  loveReveal: {
    teaserText: string;
    bigText: string;
    subtitle: string;
    buttonText: string;
  };

  // Screen 8: Reasons Why Special
  reasons: {
    heading: string;
    subheading: string;
    cards: SpecialReason[];
    buttonText: string;
  };

  // Screen 9: Final Message
  finalMessage: {
    lines: string[];
    thankYouText: string;
    finalHeartText: string;
    replayButtonText: string;
  };

  // Audio Config
  music: {
    audioUrl: string; // Background MP3 URL
    autoStartOnSurprise: boolean;
    defaultVolume: number;
  };
}

export const siteContent: SiteContent = {
  targetName: "My Dearest",
  senderName: "With All My Heart",

  welcome: {
    badgeText: "A Personalized Surprise ✨",
    heading: "Hey You ❤️",
    subtitle: "I have something special to tell you… created just for you.",
    buttonText: "Start the Surprise ✨",
  },

  personalMessage: {
    heading: "Before I say anything… ❤️",
    lines: [
      "Sometimes a person enters your life unexpectedly,",
      "and slowly becomes someone really special.",
      "You may not even realize when it happens…",
      "but suddenly their smile matters,",
      "their messages matter,",
      "and their presence feels special. ❤️"
    ],
    buttonText: "Continue →",
  },

  memories: {
    heading: "Our Little Memories 📸❤️",
    subheading: "Tap on any photo to relive our favorite moments together.",
    photos: [
      {
        id: "1",
        imageUrl: "/images/sunset.jpg",
        caption: "Every moment matters ❤️",
        subtitle: "Golden sunsets & quiet walks holding hands.",
        date: "Sunset Walk"
      },
      {
        id: "2",
        imageUrl: "/images/coffee.jpg",
        caption: "Little memories, big feelings 🌸",
        subtitle: "Cozy coffee dates, endless conversations, warm smiles.",
        date: "Warm Moments"
      },
      {
        id: "3",
        imageUrl: "/images/stargazing.jpg",
        caption: "Some moments are unforgettable ✨",
        subtitle: "Stargazing under the sky, feeling like time stopped.",
        date: "Magical Nights"
      },
      {
        id: "4",
        imageUrl: "/images/flowers.jpg",
        caption: "A bouquet of pure happiness 💐",
        subtitle: "The little unexpected surprises that mean the world.",
        date: "Pure Joy"
      }
    ],
    buttonText: "Keep Going ✨",
  },

  specialQuestion: {
    heading: "Okay… one important question. 👀❤️",
    subheading: "Are you ready?",
    yesButtonText: "Yes ❤️",
    maybeButtonText: "Maybe 🙈",
  },

  lovePoem: {
    title: "Something From My Heart… 💌",
    terminalTitle: "heart_kernel.ts — connection://my-heart",
    paragraphs: [
      "Zindagi ek code thi, samajh nahi aa raha tha kya likhun,\nPhir tum mili… aur laga, bas yahi toh missing line thi. ❤️",
      "Tum meri life ka woh function ho,\nJiske bina mera program complete nahi hota. 💻",
      "Dil ka server tumhare naam se run karta hai,\nHar heartbeat tumhari notification par react karti hai. 🫶",
      "Na tumhe kabhi \"delete\" karna hai,\nNa \"logout\" hone dena hai,\nBas tumhare saath ek lifetime connection banana hai. 🔗❤️",
      "Toh aaj dil ka final request hai—\nWill you be my forever partner?\nBecause you are not just a part of my code…\nYou are the code behind my happiness. ❤️🥰"
    ],
    question: "Will you be my forever partner? ❤️",
    yesButtonText: "YES ❤️",
    noButtonText: "NO 🙈",
    connectionEstablished: "Connection Established! 🔗❤️",
    connectionSuccess: "Forever connection successfully created. 🥹🤗",
    loveRevealText: "I LOVE YOU 🤗❤️",
    noDodges: [
      "Are you sure? 🥺",
      "My code has a feeling you might change your mind. 🙈",
      "One more thought? ❤️",
      "Error 404: 'NO' not found in my heart! 😉",
      "Re-executing logic... please click YES! 🌸",
      "You are my favorite exception, rethink! 🙈"
    ],
    continueButtonText: "Open Love Letter 💌",
  },

  proposal: {
    preText: "There is something I've wanted to say...",
    question: "Will you be someone special in my life? ❤️",
    yesButtonText: "YES ❤️",
    noButtonText: "NO 🙈",
    yesResponseHeading: "YOU SAID YES! 🥹❤️",
    yesResponseSubtitle: "I'm really happy! 🤗 You just made my entire world brighter!",
    noDodges: [
      "Are you sure? 🥺",
      "Think again 🙈",
      "One more chance? ❤️",
      "Pretty please? 🌸",
      "You know you want to say yes! 😉",
      "Nice try! 😋",
      "Nope, can't catch me! ✨"
    ],
    continueButtonText: "Read My Heart 💌",
  },

  loveLetter: {
    envelopePrompt: "Someone wrote this just for you… 💌",
    openButtonText: "Open My Letter ❤️",
    title: "Dear You, ❤️",
    paragraphs: [
      {
        id: "p1",
        text: "Kabhi socha nahi tha ki ek developer ki life mein kisi insaan ke liye itni feelings develop ho sakti hain jinka koi proper logic, algorithm ya explanation nahi hoga."
      },
      {
        id: "p2",
        text: "Main bugs ko debug kar sakta hoon,\ncomplex problems ko solve kar sakta hoon,\naur code ki thousands of lines samajh sakta hoon…\n\nLekin tumhare saamne aate hi,\nmere saare words somehow compile hona band kar dete hain. ❤️"
      },
      {
        id: "p3",
        text: "Pata nahi tum kab meri life mein itni important ban gayi.\nShayad tumhare messages ke saath,\nshayad un chhoti-chhoti conversations ke saath,\nya shayad us smile ke saath\njo tumhare baare mein sochte hi mere face par aa jaati hai."
      },
      {
        id: "p4",
        text: "Pehle meri life ek simple program jaisi thi—\nrun hoti thi,\nkaam karti thi,\nlekin kuch missing sa lagta tha.\n\nPhir tum mili…\naur laga jaise kisi ne meri life mein woh missing line add kar di\njiske bina pura code incomplete tha. 💻❤️"
      },
      {
        id: "p5",
        text: "Tum meri life ka koi temporary feature nahi ho\njise kabhi \"remove()\" kar diya jaaye.\n\nTum woh constant ho\njiski value main change nahi karna chahta.\n\nTum woh connection ho\njise main lifetime tak active rakhna chahta hoon.\n\nAur agar meri life ek repository hai,\ntoh honestly…"
      },
      {
        id: "p6",
        text: "I want you to be my favorite commit. ❤️",
        isHighlight: true,
        highlightType: "commit"
      },
      {
        id: "p7",
        text: "Main tumse perfect relationship ka promise nahi karunga,\nkyunki perfection real life mein exist nahi karti.\n\nKabhi misunderstandings hongi,\nkabhi arguments honge,\nkabhi situations difficult hongi.\n\nBut whenever life throws an error at us,\nI want us to debug it together, not debug each other out of our lives. ❤️"
      },
      {
        id: "p8",
        text: "Main future ka pura code predict nahi kar sakta.\nLekin ek cheez dil se jaanta hoon—"
      },
      {
        id: "p9",
        text: "I LOVE YOU. ❤️",
        isHighlight: true,
        highlightType: "love"
      },
      {
        id: "p10",
        text: "Sirf ek feeling ki tarah nahi,\nbalki us feeling ki tarah\njo tumhari smile mein meri happiness dekhti hai,\ntumhari problems mein tumhara saath dena chahti hai,\naur tumhari presence ko apni life ka beautiful part maanta hai.\n\nJab main apne future ke baare mein sochta hoon,\ntoh us picture mein tumhara hona mujhe bahut khoobsurat lagta hai. 🫶"
      },
      {
        id: "p11",
        text: "Isliye aaj koi complicated syntax nahi,\nkoi \"if-else\" nahi,\nkoi hidden condition nahi.\n\nBas ek simple sa question hai,\ndirectly from my heart:"
      },
      {
        id: "p12",
        text: "Will you be my forever teammate? ❤️",
        isHighlight: true,
        highlightType: "teammate"
      },
      {
        id: "p13",
        text: "Kyunki mujhe sirf tumhara haath pakadna nahi hai…\n\nMujhe tumhare saath zindagi ka pura code likhna hai—\nline by line,\nmemory by memory,\naur chapter by chapter. ❤️💻",
        isHighlight: true,
        highlightType: "code"
      },
      {
        id: "p14",
        text: "I Love You.\nToday, tomorrow, and in every beautiful version of our story. ❤️"
      }
    ],
    signaturePrefix: "With all my heart,",
    signature: "Your Developer ❤️💻",
    continueButtonText: "Continue ❤️",
  },

  loveReveal: {
    teaserText: "There is one more thing…",
    bigText: "I LOVE YOU 🤗❤️",
    subtitle: "More than words can ever truly express.",
    buttonText: "Why You Are Special ❤️",
  },

  reasons: {
    heading: "Why You Are Special To Me ❤️",
    subheading: "Tap each card to discover why you mean so much.",
    cards: [
      {
        id: "smile",
        icon: "😊",
        title: "Your Smile",
        shortDesc: "It lights up even the darkest days...",
        fullMessage: "Your smile has a magical way of turning any bad day around instantly. Seeing you happy is my favorite sight in the world."
      },
      {
        id: "kindness",
        icon: "🫶",
        title: "Your Kindness",
        shortDesc: "The warmth in your heart...",
        fullMessage: "The soft, genuine way you care for people and make everyone feel understood is truly rare and breathtaking."
      },
      {
        id: "presence",
        icon: "✨",
        title: "Your Presence",
        shortDesc: "Just being around you...",
        fullMessage: "Everything feels calmer, happier, and just right when you are near. You bring a sense of comfort no one else can."
      },
      {
        id: "little-things",
        icon: "🌸",
        title: "Your Little Things",
        shortDesc: "The cute little habits...",
        fullMessage: "The way you laugh, your little expressions, your unique quirks—all these small details make you completely irresistible."
      },
      {
        id: "happiness",
        icon: "❤️",
        title: "The Happiness You Bring",
        shortDesc: "My favorite feelings...",
        fullMessage: "You give me a kind of happiness that stays in my heart even when we're apart. Thank you for being you."
      }
    ],
    buttonText: "Final Message 🌸",
  },

  finalMessage: {
    lines: [
      "Some people become special...",
      "Not because of how long we have known them...",
      "But because of how they make us feel. ❤️"
    ],
    thankYouText: "Thank you for being a beautiful part of my story. 🌸",
    finalHeartText: "I LOVE YOU 🤗❤️",
    replayButtonText: "Relive the Experience 🔄",
  },

  music: {
    // Royalty-free gentle romantic piano track sample
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
    autoStartOnSurprise: true,
    defaultVolume: 0.5,
  }
};
