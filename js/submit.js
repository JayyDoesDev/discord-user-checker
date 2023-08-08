async function submit() {
  var input = document.querySelector("input").value;
  if (input) {
    var fetched = await fetch("https://japi.rest/discord/v1/user/" + input);
    var res = await fetched.json();
    var status = res.presence.status;
    var id = res.data.id;
    var username = res.data.username;
    var discrim = res.data.discriminator;
    var flags = res.data.public_flags_array;
    var avatarID = res.data.avatar;
    var avatar = "https://cdn.discordapp.com/avatars/" + id + "/" + avatarID;
    var bannerColor = res.data.banner_color;
    var accentColor = res.data.accent_color;
    document.getElementById("avatar").src = avatar;
    document.getElementById("user-id").innerHTML = "User ID: " + id;
    document.getElementById("user-username").innerHTML =
      "Username: " + username;
      document.getElementById("user-discrim").innerHTML = "Discriminator: " + discrim
      document.getElementById("user-flags").innerHTML = "Flags:" + flags.join(",")
    document.getElementById("user-banner-color").innerHTML =
      "Banner Color: " + bannerColor;
    document.getElementById("user-accent-color").innerHTML =
      "Accent Color: " + accentColor;

    switch (status) {
      case "online":
        document.getElementById("status").src = "../assets/online.png";
        break;
      case "idle":
        document.getElementById("status").src = "../assets/idle.png";
        break;
      case "dnd":
        document.getElementById("status").src = "../assets/dnd.png";
        break;
      case "streaming":
        document.getElementById("status").src = "../assets/streaming.png";
        break;
      default:
        document.getElementById("status").src = "../assets/online.png";
    }

    if (res.presence.activities) {
        var activity = res.presence.activities[0].name;
        var type = res.presence.activities[0].type;
        var typeString;
        switch (type) {
          case 0:
            typeString = "playing";
            break;
          case 1:
            typeString = "streaming";
            break;
          case 2:
            typeString = "listening to";
            break;
          case 3:
            typeString = "watching";
            break;
          case 4:
            typeString = "playing";
            break;
          case 5:
            typeString = "competing";
            break;
          default: {
            typeString = "not playing anything";
          }
        }
        document.getElementById("presence").innerHTML = "Presence: " +typeString + " " + activity;
      } else {
        document.getElementById("presence").innerHTML = "Presence: not playing anything";
        return;
      }
  } else {
    alert("You must provide a Discord user id.")
  }
}


// soon
function parseFlags(...flags) {
}