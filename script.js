// Array of tech-related Bible verses with categories
const techVerses = [
  {
    text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters",
    reference: "Colossians 3:23",
    category: "excellence",
  },
  {
    text: "Skilled workers have all kinds of valuable possessions and benefits",
    reference: "Proverbs 22:29",
    category: "skill",
  },
  {
    text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind",
    reference: "2 Timothy 1:7",
    category: "courage",
  },
  {
    text: "Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity",
    reference: "Ephesians 5:15-16",
    category: "wisdom",
  },
  {
    text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus",
    reference: "Colossians 3:17",
    category: "purpose",
  },
  {
    text: "Do you see someone skilled in their work? They will serve before kings",
    reference: "Proverbs 22:29",
    category: "skill",
  },
  {
    text: "In all your ways acknowledge him, and he will make straight your paths",
    reference: "Proverbs 3:6",
    category: "guidance",
  },
  {
    text: "Let all things be done decently and in order",
    reference: "1 Corinthians 14:40",
    category: "excellence",
  },
];

// Array of tech devotionals with categories
const techDevotionals = [
  {
    text: "As technology advances, let us remember that our skills are gifts from God, meant to serve and glorify Him. How can we use our technical abilities to make a positive impact today?",
    category: "purpose",
  },
  {
    text: "In the fast-paced world of technology, remember that our work is worship when done with excellence and integrity. Let's approach our code and projects as offerings to God.",
    category: "excellence",
  },
  {
    text: "Innovation and creativity are reflections of our Creator God. As we build and develop new solutions, we're participating in God's ongoing work of creation.",
    category: "creativity",
  },
  {
    text: "Technology connects us globally, reminding us of our calling to be salt and light in the digital world. How can your tech skills help spread God's love today?",
    category: "purpose",
  },
  {
    text: "Just as we debug our code, let's examine our hearts daily. Clean code starts with a clean heart.",
    category: "excellence",
  },
  {
    text: "Every line of code can be written to honor God. Whether building APIs or fixing bugs, our work matters to Him.",
    category: "purpose",
  },
  {
    text: "Technology is a powerful tool for kingdom impact. How can we use our skills to serve others and glorify God?",
    category: "service",
  },
  {
    text: "In a world of constant updates and changes, God's truth remains our unchanging foundation.",
    category: "wisdom",
  },
];

// Function to get random item from array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to get matching devotional for verse category
function getMatchingDevotional(verseCategory) {
  const matchingDevotionals = techDevotionals.filter(
    (d) => d.category === verseCategory
  );
  if (matchingDevotionals.length > 0) {
    return getRandomItem(matchingDevotionals);
  }
  return getRandomItem(techDevotionals);
}

// Function to update the page content
function updateContent() {
  // Get random verse
  const verse = getRandomItem(techVerses);

  // Get matching or random devotional
  const devotional = getMatchingDevotional(verse.category);

  // Update verse
  document.getElementById("verse-text").textContent = verse.text;
  document.getElementById("verse-reference").textContent = verse.reference;

  // Update devotional
  document.getElementById("devotional-text").textContent = devotional.text;

  // Save to storage
  chrome.storage.local.set({
    lastVerse: verse,
    lastDevotional: devotional,
    lastUpdate: new Date().getTime(),
  });
}

// Learn More button click handler
document.getElementById("learn-more").addEventListener("click", () => {
  window.open("https://believerstechexpo.com", "_blank");
});

// Check if we need to update content (once per day)
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Initialize content
chrome.storage.local.get(
  ["lastUpdate", "lastVerse", "lastDevotional"],
  (result) => {
    const now = new Date().getTime();

    if (!result.lastUpdate || now - result.lastUpdate > TWENTY_FOUR_HOURS) {
      // Time to update with new content
      updateContent();
    } else {
      // Use stored content
      if (result.lastVerse && result.lastDevotional) {
        document.getElementById("verse-text").textContent =
          result.lastVerse.text;
        document.getElementById("verse-reference").textContent =
          result.lastVerse.reference;
        document.getElementById("devotional-text").textContent =
          result.lastDevotional.text;
      } else {
        updateContent();
      }
    }
  }
);

// Function to share content
async function shareContent(text) {
  try {
    if (navigator.share) {
      await navigator.share({
        text: text,
      });
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  } catch (err) {
    console.error("Error sharing:", err);
  }
}

// Share verse button click handler
document.getElementById("share-verse").addEventListener("click", () => {
  const verseText = document.getElementById("verse-text").textContent;
  const verseRef = document.getElementById("verse-reference").textContent;
  shareContent(`${verseText} - ${verseRef} #BTEInspiration`);
});

// Share devotional button click handler
document.getElementById("share-devotional").addEventListener("click", () => {
  const devotionalText = document.getElementById("devotional-text").textContent;
  shareContent(`${devotionalText} #BTEInspiration`);
});

// Refresh content button click handler
document.getElementById("refresh-content").addEventListener("click", () => {
  updateContent();
});

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");

  // Focus search input when pressing '/'
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Clear search on escape
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      searchInput.blur();
    }
  });
});
