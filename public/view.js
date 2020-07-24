(function () {
  /////////////////////////////////////////////////
  const url = window.location.origin + "/game";
  let socket = io.connect(url);
  let socket2 = io("/view");
  myTurn = null;

  function getBoardState() {
    var obj = {};

    /* We are creating an object where each attribute corresponds
         to the name of a cell (r0c0, r0c1, ..., r2c2) and its value is
         'X', 'O' or '' (empty).
        */
    $(".board button").each(function () {
      obj[$(this).attr("id")] = $(this).text() || "";
    });

    return obj;
  }

  function isGameOver() {
    var state = getBoardState();
    var matches = ["XXX", "OOO"];

    // We are creating a string for each possible winning combination of the cells
    var rows = [
      state.r0c0 + state.r0c1 + state.r0c2, // 1st line
      state.r1c0 + state.r1c1 + state.r1c2, // 2nd line
      state.r2c0 + state.r2c1 + state.r2c2, // 3rd line
      state.r0c0 + state.r1c0 + state.r2c0, // 1st column
      state.r0c1 + state.r1c1 + state.r2c1, // 2nd column
      state.r0c2 + state.r1c2 + state.r2c2, // 3rd column
      state.r0c0 + state.r1c1 + state.r2c2, // Primary diagonal
      state.r0c2 + state.r1c1 + state.r2c0, // Secondary diagonal
    ];

    // Loop through all the rows looking for a match
    for (var i = 0; i < rows.length; i++) {
      if (rows[i] === matches[0] || rows[i] === matches[1]) {
        return true;
      }
    }

    return false;
  }

  function renderTurnMessage() {
    if (!myTurn) {
      // If not player's turn disable the board
      $("#message").text("Your opponent's turn");
      $(".board button").attr("disabled", true);
    } else {
      // Enable it otherwise
      $("#message").text("Your turn");
      $(".board button").removeAttr("disabled");
      const newMove = Number($("#moves").text()) + 1;
      console.log("newMove:", newMove);
      $(".moves #moves").text(newMove);
    }
  }

  // Bind event on players move
  socket.on("move.made", function (data) {
    $("#" + data.position).text(data.symbol); // Render move

    if (!isGameOver()) {
      // If game isn't over show who's turn is this
      renderTurnMessage();
    }
  });

  // Bind event for game begin
  socket.on("game.begin", function (data) {
    symbol = data.symbol; // The server is assigning the symbol
    myTurn = symbol === "X"; // 'X' starts first
    console.log(data);
    window.localStorage.setItem("usernameX", data.username1);
    window.localStorage.setItem("usernameO", data.username2);
    renderTurnMessage();
  });

  // Bind on event for opponent leaving the game
  socket.on("opponent.left", function () {
    // $("#message").text("Your opponent left the game.");
    alert("Opponent Left The Game!");
    $(".board button").attr("disabled", true);
  });

  //sounds
  //theme sound
  var sound = new Howl({
    src: ["/theme_01.mp3"],
    autoplay: 1,
    loop: true,
  });
  sound.play();
  var isPlaying = 1;
  $("#toggle_sound").on("click", () => {
    if (isPlaying == 1) {
      isPlaying = 0;
      sound.stop();
    } else {
      isPlaying = 1;
      sound.play();
    }
  });
  //click sound
  var clicked = new Howl({
    src: ["/eatpellet.ogg"],
  });
  // $("button").on("click", ()=>{
  //     clicked.play();
  // });
  $("#username").text(window.localStorage.getItem("usernameX"));

  //communication events
  $("#happy").on("click", () => {
    socket2.emit("happy", "😀");
  });
  socket.on("happy", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });
  //eyes reaction
  $("#eyes").on("click", () => {
    socket2.emit("eyes", "👀");
  });
  socket.on("eyes", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //love reaction
  $("#love").on("click", () => {
    socket2.emit("love", "💓");
  });
  socket.on("love", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //clap reaction
  $("#clap").on("click", () => {
    socket2.emit("clap", "👏");
  });
  socket.on("clap", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //like reaction
  $("#like").on("click", () => {
    socket2.emit("like", "👍");
  });
  socket.on("like", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //downvote reaction
  $("#downvote").on("click", () => {
    socket2.emit("downvote", "👎");
  });
  socket.on("downvote", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //like reaction
  $("#think").on("click", () => {
    socket2.emit("think", "🤔");
  });
  socket.on("think", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //mindblown reaction
  $("#mindblown").on("click", () => {
    socket2.emit("mindblown", "🤯");
  });
  socket.on("mindblown", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //shush reaction
  $("#shush").on("click", () => {
    socket2.emit("shush", "🤫");
  });
  socket.on("shush", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //badass reaction
  $("#badass").on("click", () => {
    socket2.emit("badass", "😎");
  });
  socket.on("badass", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //sleeping reaction
  $("#sleeping").on("click", () => {
    socket2.emit("sleeping", "😴");
  });
  socket.on("sleeping", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //crying reaction
  $("#crying").on("click", () => {
    socket2.emit("crying", "😭");
  });
  socket.on("crying", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //femaleslap reaction
  $("#femaleslap").on("click", () => {
    socket2.emit("femaleslap", "🤦");
  });
  socket.on("femaleslap", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //hail reaction
  $("#hail").on("click", () => {
    socket2.emit("hail", "🙌");
  });
  socket.on("hail", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //angry reaction
  $("#angry").on("click", () => {
    socket2.emit("angry", "😡");
  });
  socket.on("angry", (data) => {
    $(".output").append(`<p>${data}</p>`);
  });

  //send a message
  $("#send").on("click", () => {
    var msg = $("#chat-message").val();
    socket2.emit("message", msg);
    $("#chat-message").val(" ");
  });

  socket.on("message", (msg) => {
    $(".output").append(`<p>${msg}</p>`);
  });
})();

