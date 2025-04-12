const characters = {
    captain_morris: {
      name: "Captain Morris",
      description: "An elderly fisherman who has spent his entire life on the waters of Ravenport. His brother Peter was one of the disappeared, and he's desperate for answers.",
      relationship: 0, // -100 to 100 scale of how they feel about you
      portrait: "/assets/images/captain_morris.jpg",
      backgroundColor: "#333" // Fallback if image doesn't load
    },
    
    eleanor_hayes: {
      name: "Eleanor Hayes",
      description: "Owner and operator of the Mariner's Rest Inn. A practical and observant woman who knows most of the town's secrets.",
      relationship: 0,
      portrait: "/assets/images/eleanor_hayes.jpg",
      backgroundColor: "#444"
    },
    
    meredith_finch: {
      name: "Meredith Finch",
      description: "The elderly lighthouse keeper with a no-nonsense attitude and a keen eye. She's maintained the lighthouse for decades and sees everything that happens on the water.",
      relationship: 0,
      portrait: "/assets/images/meredith_finch.jpg",
      backgroundColor: "#555"
    },
    
    dr_james_blackwood: {
      name: "Dr. James Blackwood",
      description: "A scholarly antiquarian and local historian who runs a small shop of curios and books. Has an extensive knowledge of Ravenport's darker history.",
      relationship: 0,
      portrait: "/assets/images/dr_blackwood.jpg",
      backgroundColor: "#3a3a3a"
    },
    
    sheriff_dawson: {
      name: "Sheriff Richard Dawson",
      description: "The town's weary sheriff who has written off the disappearances as unfortunate accidents. Seems eager to avoid any supernatural explanations.",
      relationship: -20, // Starts slightly negative
      portrait: "/assets/images/sheriff_dawson.jpg",
      backgroundColor: "#2a2a3a"
    }
  };
  
  export default characters;