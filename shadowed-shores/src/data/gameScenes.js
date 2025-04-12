const gameScenes = {
    start: {
      location: 'Harbor Point',
      text: `<div class="scene-description">The rain beats down heavily on the windshield as your car crawls along the coastal road. Through the mist, you make out the silhouette of a lighthouse standing sentinel over Ravenport, a small fishing town with a dark reputation.</div>
  
      <p>You've come to investigate the mysterious disappearance of local fishermen - a case that the authorities have all but abandoned. As an independent investigator with a background in the paranormal, you sense there's more to these disappearances than meets the eye.</p>
      
      <p>Your research has led you to stories of strange lights at sea, haunting melodies carried on the wind, and a fog that seems to have a mind of its own. The locals call it the work of the "Tide Caller" - a legend as old as the town itself.</p>`,
      choices: [
        { text: "Head to the harbor first to talk with the remaining fishermen", nextScene: "harbor" },
        { text: "Check into the local inn to establish your base of operations", nextScene: "inn" },
        { text: "Drive by the lighthouse to get a lay of the land", nextScene: "lighthouse_exterior" }
      ]
    },
    
    harbor: {
      location: 'Ravenport Harbor',
      text: `<div class="scene-description">The harbor is eerily quiet when you arrive. A few weathered fishing boats sway gently in the murky water. The rain has let up, but a thick fog hangs over everything, muffling sounds and limiting visibility.</div>
  
      <p>As you walk along the creaking wooden docks, you notice an older man sitting alone in a small boat, mending a fishing net with practiced hands. His weathered face looks up as you approach, eyes narrowing with suspicion.</p>
      
      <div class="character-container">
        <div class="character-portrait" style="background-color: #333;"></div>
        <div>
          <p class="character-name">Captain Morris</p>
          <div class="dialogue-container">
            <p>"Don't get many strangers around here these days. Not since the disappearances started. You a reporter? Or one of them government types who don't believe us?"</p>
          </div>
        </div>
      </div>`,
      choices: [
        { text: "Introduce yourself as an independent investigator looking into the missing fishermen", nextScene: "harbor_investigation", setFlag: { metCaptain: true } },
        { text: "Ask bluntly about the 'Tide Caller' legend to gauge his reaction", nextScene: "harbor_tide_caller", action: { stat: "trust", change: -10 } },
        { text: "Just observe the harbor more before engaging further", nextScene: "harbor_observation" }
      ]
    },
    
    harbor_investigation: {
      location: 'Ravenport Harbor',
      text: `<div class="scene-description">Captain Morris's expression softens slightly as you explain your purpose in Ravenport. He sets aside his netting and gives you his full attention.</div>
  
      <div class="character-container">
        <div class="character-portrait" style="background-color: #333;"></div>
        <div>
          <p class="character-name">Captain Morris</p>
          <div class="dialogue-container">
            <p>"Well, at least someone's taking us seriously. Seven men gone in the past three months. Good men, experienced sailors who knew these waters like the back of their hand."</p>
            <p>He lowers his voice. "They all disappeared on foggy nights, just like this one. Their boats found empty, drifting out at sea near the Devil's Teeth rocks."</p>
            <p>"There's something out there. Something that... calls to them. My brother Peter was the third to go. Night before he disappeared, he told me he'd been hearing singing when he was out alone on his boat. Beautiful singing, he said, like nothing of this world."</p>
          </div>
        </div>
      </div>
  
      <p>As Morris speaks, you notice a small silver object glinting in the folds of the fishing net. It appears to be a locket of some kind.</p>`,
      choices: [
        { text: "Ask about the Devil's Teeth rocks", nextScene: "devils_teeth_info", action: { stat: "clues", change: 1 } },
        { text: "Inquire more about the singing his brother mentioned", nextScene: "singing_investigation", action: { stat: "clues", change: 1 } },
        { text: "Mention the locket you spotted in his fishing net", nextScene: "locket_discovery", setFlag: { foundLocket: true }, action: { stat: "clues", change: 2 } }
      ]
    },
    
    devils_teeth_info: {
      location: 'Ravenport Harbor',
      text: `<div class="scene-description">Captain Morris points out to sea, though the thick fog obscures the view.</div>
  
      <div class="character-container">
        <div class="character-portrait" style="background-color: #333;"></div>
        <div>
          <p class="character-name">Captain Morris</p>
          <div class="dialogue-container">
            <p>"The Devil's Teeth... dangerous rock formation about two miles offshore. Sharp rocks that have claimed many ships over the centuries. Local legend says it's the skeletal remains of a sea monster killed by the town's founders."</p>
            <p>He shakes his head. "What's strange is all the men disappeared near there, but none of their boats were damaged. Just... empty. As if they stepped off into the sea willingly."</p>
          </div>
        </div>
      </div>
  
      <p>The captain pulls out a worn map from his pocket and marks the location of the rocks for you.</p>
  
      <p>"If you're serious about investigating, you should talk to Old Meredith who runs the lighthouse. She sees everything that happens on these waters."</p>`,
      choices: [
        { text: "Ask about the locket you spotted in his fishing net", nextScene: "locket_discovery", setFlag: { foundLocket: true }, action: { stat: "clues", change: 1 } },
        { text: "Ask about Old Meredith and the lighthouse", nextScene: "meredith_info", action: { stat: "clues", change: 1 } },
        { text: "Thank him for the information and head to the inn", nextScene: "inn" }
      ],
      addToInventory: { id: "devils_teeth_map", name: "Map of Devil's Teeth", description: "A hand-drawn map showing the location of the dangerous rock formation known as the Devil's Teeth, about two miles offshore from Ravenport." }
    },
    
    locket_discovery: {
      location: 'Ravenport Harbor',
      text: `<div class="scene-description">Captain Morris follows your gaze to the silver object in his net. His eyes widen in recognition and he carefully extracts the locket.</div>
  
      <div class="character-container">
        <div class="character-portrait" style="background-color: #333;"></div>
        <div>
          <p class="character-name">Captain Morris</p>
          <div class="dialogue-container">
            <p>"Good eyes you've got there. This... this was my brother's. Must have gotten tangled in my nets when I was out yesterday."</p>
            <p>His hands tremble slightly as he opens the locket, revealing a faded photograph of a woman with striking features and an unusual pendant around her neck.</p>
            <p>"Strange... this isn't Peter's wife. I've never seen this woman before."</p>
          </div>
        </div>
      </div>
  
      <p>He hesitates, then holds out the locket to you. "Maybe this will help your investigation. I've been staring at it for months and gotten nowhere."</p>
  
      <p>The silver locket is cool to the touch. The woman in the photograph has an almost hypnotic stare, and the pendant she wears appears to be made of black coral, carved into the shape of a siren or mermaid.</p>`,
      choices: [
        { text: "Ask if anyone in town might recognize the woman in the photo", nextScene: "woman_inquiry", action: { stat: "clues", change: 1 } },
        { text: "Thank him and head to the lighthouse to speak with Meredith", nextScene: "lighthouse_exterior" },
        { text: "Thank him and check into the inn to examine the locket more closely", nextScene: "inn" }
      ],
      addToInventory: { id: "silver_locket", name: "Silver Locket", description: "A silver locket containing a photo of an unknown woman wearing a black coral pendant shaped like a siren. It belonged to Peter, Captain Morris's missing brother." }
    },
    
    inn: {
        location: 'The Mariner\'s Rest Inn',
        text: `<div class="scene-description">The Mariner's Rest Inn is an old three-story building with weathered shingles and a sign that sways and creaks in the coastal wind. Despite its age, there's a warmth to the place that contrasts with the gloomy atmosphere of the town.</div>
    
        <p>As you step inside, you're greeted by the smell of wood fire and something cooking - hearty fish stew, if you had to guess. The lobby is cozy, decorated with nautical artifacts, old maps, and what appear to be black and white photographs documenting the town's history.</p>
    
        <p>Behind the front desk stands a woman in her fifties with salt-and-pepper hair tied back in a practical bun. She looks up from her ledger as the door closes behind you.</p>
        
        <div class="character-container">
          <div class="character-portrait" style="background-color: #444;"></div>
          <div>
            <p class="character-name">Eleanor Hayes</p>
            <div class="dialogue-container">
              <p>"Welcome to the Mariner's Rest. Don't get many visitors these days. Looking for a room, I hope? I've got plenty available."</p>
            </div>
          </div>
        </div>
    
        <p>Her eyes study you with curiosity and perhaps a touch of suspicion.</p>`,
        choices: [
          { text: "Book a room and mention you're investigating the disappearances", nextScene: "inn_investigation", action: { stat: "trust", change: 5 } },
          { text: "Book a room without revealing your purpose in town", nextScene: "inn_discrete" },
          { text: "Ask about the town's history while looking at the photographs", nextScene: "inn_history", action: { stat: "clues", change: 1 } }
        ]
    },
      
    lighthouse_exterior: {
        location: 'Ravenport Lighthouse',
        text: `<div class="scene-description">The lighthouse stands tall on a rocky outcropping, its beam cutting through the thick fog in hypnotic, rhythmic sweeps. A narrow path winds up from the coastal road, slick with sea spray and rainwater.</div>
    
        <p>As you approach, you notice how isolated this place is from the rest of town. The lighthouse itself appears well-maintained despite its obvious age - a stark white tower with a small attached keeper's house painted the same color.</p>
    
        <p>Near the entrance, you spot an elderly woman tending to a small garden of hardy coastal plants. She's dressed practically in rubber boots and a heavy sweater, seemingly unbothered by the chill in the air. When she notices your approach, she straightens up with surprising agility for someone her age.</p>
        
        <div class="character-container">
          <div class="character-portrait" style="background-color: #555;"></div>
          <div>
            <p class="character-name">Meredith Finch</p>
            <div class="dialogue-container">
              <p>"Don't get many visitors up this way," she calls out, studying you with keen eyes that seem to miss nothing. "Especially not with this fog rolling in. You must be either lost or looking for something specific."</p>
            </div>
          </div>
        </div>`,
        choices: [
          { text: "Introduce yourself and ask about the disappearances", nextScene: "lighthouse_inquiry", setFlag: { investigatedLighthouse: true } },
          { text: "Compliment her garden as an icebreaker before asking questions", nextScene: "lighthouse_garden", action: { stat: "trust", change: 10 } },
          { text: "Ask if she's seen any unusual activities from her vantage point", nextScene: "lighthouse_observation", action: { stat: "clues", change: 1 }, setFlag: { investigatedLighthouse: true } }
        ]
    },
      
    blackwood_shop: {
        location: 'Blackwood\'s Antiquities & Books',
        text: `<div class="scene-description">The small shop is crammed with bookshelves that reach the ceiling, display cases filled with artifacts, and the distinct smell of old paper and polished wood. Despite the clutter, everything appears meticulously organized and dusted.</div>
    
        <p>As the bell above the door announces your entrance, a man emerges from behind a beaded curtain. Dr. James Blackwood is tall and lean, with silver-streaked dark hair and round spectacles. He moves with a scholar's slight stoop, but his eyes are sharp and curious.</p>
        
        <div class="character-container">
          <div class="character-portrait" style="background-color: #3a3a3a;"></div>
          <div>
            <p class="character-name">Dr. James Blackwood</p>
            <div class="dialogue-container">
              <p>"Good day to you. Welcome to my humble establishment." His voice is cultured, with a hint of an accent you can't quite place. "How may I assist you? Looking for something specific, or just browsing our local curiosities?"</p>
            </div>
          </div>
        </div>
    
        <p>He gestures to the shop around him, which includes a section devoted to local history and folklore that catches your eye.</p>`,
        choices: [
          { text: "Ask about the town's history and the disappearances", nextScene: "blackwood_history", setFlag: { talkedToShopkeeper: true }, action: { stat: "clues", change: 1 } },
          { text: "Show him the silver locket if you found it", requireFlag: "foundLocket", nextScene: "blackwood_locket", action: { stat: "clues", change: 2 } },
          { text: "Browse the section on local folklore", nextScene: "blackwood_folklore", action: { stat: "clues", change: 1 } }
        ]
    },
      
      // Add more scenes as needed for your game's progression
      // This is just a starting framework with 5 main locations and a few branches
      
      // Example of a conditional scene that requires the locket
    blackwood_locket: {
        location: 'Blackwood\'s Antiquities & Books',
        text: `<div class="scene-description">You retrieve the silver locket from your pocket and carefully place it on the counter. Dr. Blackwood's eyes widen with interest behind his spectacles.</div>
    
        <div class="character-container">
          <div class="character-portrait" style="background-color: #3a3a3a;"></div>
          <div>
            <p class="character-name">Dr. James Blackwood</p>
            <div class="dialogue-container">
              <p>"My word... where did you find this?" He picks up the locket with delicate fingers, examining it closely.</p>
              <p>As he opens it and sees the photograph inside, his complexion pales visibly. "This is... quite remarkable. The pendant she's wearing is very distinctive."</p>
            </div>
          </div>
        </div>
    
        <p>He crosses quickly to a bookshelf and pulls down a large, leather-bound volume. Flipping through the pages with practiced efficiency, he stops and turns the book toward you.</p>
        
        <p>There on the page is a sketched illustration of a similar pendant, labeled "The Siren's Call" in flowing script.</p>
        
        <div class="character-container">
          <div class="character-portrait" style="background-color: #3a3a3a;"></div>
          <div>
            <p class="character-name">Dr. James Blackwood</p>
            <div class="dialogue-container">
              <p>"According to local legend, this pendant was worn by a woman named Lydia Marsh in the 1880s. She was accused of being a sea witch who lured sailors to their deaths with an enchanted song."</p>
              <p>He looks at the photo again. "This can't be the same woman, of course... but the resemblance of the pendant is uncanny. It was said to be carved from the black coral that grows only in the deepest waters near the Devil's Teeth."</p>
            </div>
          </div>
        </div>`,
        choices: [
          { text: "Ask what happened to Lydia Marsh", nextScene: "lydia_story", action: { stat: "clues", change: 1 } },
          { text: "Ask if he knows anyone who might recognize the woman in the photo", nextScene: "photo_inquiry" },
          { text: "Thank him and head to the lighthouse to speak with Meredith", nextScene: "lighthouse_exterior" }
        ],
        addToInventory: { id: "siren_lore", name: "Notes on the Siren's Call", description: "Information about a pendant called 'The Siren's Call' that was worn by a woman named Lydia Marsh in the 1880s, who was accused of being a sea witch." }
    }
};
    
export default gameScenes;