// Her kommer din kode. Du kan også evt. velge å ha JS-koden i ekstern fil.

// Hero characters
var namelessKnight = document.getElementById("nameless-knight");
var namelessKnightHp = document.getElementById("nameless-knight-hp-div");
var theCat = document.getElementById("the-cat");
var theCatHp = document.getElementById("the-cat-hp-div");
var juliaTheArcher = document.getElementById("julia-the-archer");
var juliaTheArcherHp = document.getElementById("julia-the-archer-hp-div");

// Support character
var williamTheHealer = document.getElementById("william-the-healer");

// Big Boss og appearing monster
var bigBoss = document.getElementById("big-boss");
var bigBossHp = document.getElementById("big-boss-hp-div");
var appearingSlime = document.getElementById("appearing-monster-slime");
var appearingBat = document.getElementById("appearing-monster-bat");

// output div
var outputDiv = document.getElementById("output-div");

var herosHp = [namelessKnightHp, theCatHp, juliaTheArcherHp];

// funksjon for styling av appearing monster
function appearingMonsterStyle(monsterName) {
  monsterName.style.visibility = "hidden";
  monsterName.style.bottom = "150px";
  monsterName.style.width = "100px";
  monsterName.style.borderBottom = "3px solid rgba(150, 50, 50, 0.5";
  monsterName.style.left = "750px";
}

appearingMonsterStyle(appearingSlime);
appearingMonsterStyle(appearingBat);

// outPutDiv funksjonen
function updateOutput(text) {
  outputDiv.textContent = text;
}

function theHealer() {
  // Velg en tilfeldig helt å helbrede
  var heroes = ["Nameless Knight", "The Cat", "Julia the Archer"];
  var randomIndex = Math.floor(Math.random() * heroes.length);
  var selectedHero = heroes[randomIndex];

  // Velg en tilfeldig mengde helbredelse mellom 1 og 20 HP
  var healAmount = Math.floor(Math.random() * 20) + 1;

  // Vis melding om helbredelsen
  updateOutput(`Helbreder ${selectedHero} med ${healAmount} HP`);

  // Sjekk om helten allerede er fullt helbredet
  var heroHp = document.getElementById(
    `${selectedHero.toLowerCase().replace(/ /g, "-")}-hp-div`
  );
  if (heroHp.offsetWidth >= 200) {
    updateOutput(`Du har brukt opp altarnativet for helbredelse`);
    williamTheHealer.style.pointerEvents = "none";
    return;
  }

  // Helbred helten, men ikke mer enn maksimalt 200 HP
  var newWidth = Math.min(heroHp.offsetWidth + healAmount, 200);
  heroHp.style.width = `${newWidth}px`;
}

williamTheHealer.onclick = theHealer;

var bossDamage = Math.floor(Math.random() * 30);

function bossAttack() {
  if (bigBossHp.offsetWidth <= 0) {
    return; // Hvis big boss er død stopper hele spille opp
  }

  var heroName = ["Nameless Knight", "The Cat", "Julia the Archer"];
  var heroElements = [namelessKnight, theCat, juliaTheArcher];
  var randomHeroIndex = Math.floor(Math.random() * heroElements.length);
  var attackingHero = heroName[randomHeroIndex];
  var randomTarget = herosHp[randomHeroIndex];
  bossDamage = Math.floor(Math.random() * 30);
  var newWidth = Math.max(0, randomTarget.offsetWidth - bossDamage);
  randomTarget.style.width = `${newWidth}px`;
}

function knightAttack() {
  if (bigBossHp.offsetWidth <= 0) {
    return;
  }

  var damage;

  if (bigBossHp.offsetWidth <= 60) {
    bigBoss.style.height = "565px";
    damage = Math.floor(Math.random() * 10); // boss blir større og hero dealer mindre dmg
  } else {
    damage = Math.floor(Math.random() * 30);
  }

  var heroName = ["Nameless Knight", "The Cat", "Julia the Archer"];
  var heroElements = [namelessKnight, theCat, juliaTheArcher];
  var randomHeroIndex = Math.floor(Math.random() * heroElements.length);
  var attackingHero = heroName[randomHeroIndex];
  var randomTarget = herosHp[randomHeroIndex];
  var newWidth = Math.max(0, bigBossHp.offsetWidth - damage);
  bigBossHp.style.width = `${newWidth}px`;
  updateOutput(
    `Nameless knight angriper Big Boss og dealer ${damage} HP, big boss angriper ${attackingHero} og dealer ${bossDamage}`
  );

  if (bigBossHp.offsetWidth <= 0) {
    // når boss = 0 HP --> YOU WIN
    bigBossHp.style.width = "0px";
    bigBoss.style.transform = "rotate(90deg)";
    bigBoss.style.transition = "all .3s ease-in-out";
    bigBoss.style.bottom = "-50px";
    outputDiv.style.background = "green";
    updateOutput(`YOU WIN!, Nameless Knight killed the boss`);
  } else if (namelessKnightHp.offsetWidth <= 0) {
    namelessKnight.style.pointerEvents = "none";
    namelessKnight.style.transform = "rotate(-90deg)";
    namelessKnight.style.transition = "all .3s ease-in-out";
    namelessKnight.style.bottom = "60px";
    updateOutput(`The boss killed Nameless Knight!`);
    //
  }

  bossAttack();
}

function catAttack() {
  if (bigBossHp.offsetWidth <= 0) {
    return;
  }

  var damage;
  if (bigBossHp.offsetWidth <= 60) {
    bigBoss.style.height = "565px";
    damage = Math.floor(Math.random() * 10); // boss blir større og hero dealer mindre dmg
  } else {
    damage = Math.floor(Math.random() * 20);
  }

  var heroName = ["Nameless Knight", "The Cat", "Julia the Archer"];
  var heroElements = [namelessKnight, theCat, juliaTheArcher];
  var randomHeroIndex = Math.floor(Math.random() * heroElements.length);
  var attackingHero = heroName[randomHeroIndex];
  var randomTarget = herosHp[randomHeroIndex];
  var newWidth = Math.max(0, bigBossHp.offsetWidth - damage);
  bigBossHp.style.width = `${newWidth}px`;

  updateOutput(
    `The cat angriper Big Boss og dealer ${damage} HP, big boss angriper ${attackingHero} og dealer ${bossDamage}`
  );

  if (bigBossHp.offsetWidth <= 0) {
    // når boss = 0 HP --> YOU WIN
    bigBossHp.style.width = "0px";
    bigBoss.style.transform = "rotate(90deg)";
    bigBoss.style.transition = "all .3s ease-in-out";
    bigBoss.style.bottom = "-50px";
    outputDiv.style.background = "green";
    updateOutput(`YOU WIN!, The cat killed the boss`);
  } else if (theCatHp.offsetWidth <= 0) {
    theCat.style.pointerEvents = "none";
    theCat.style.transform = "rotate(-90deg)";
    theCat.style.transition = "all .3s ease-in-out";
    theCat.style.bottom = "60px";
    updateOutput(`The boss killed the cat!`);
  }
  bossAttack();
}

function juliaAttack() {
  if (bigBossHp.offsetWidth <= 0) {
    return;
  }

  var damage;
  if (bigBossHp.offsetWidth <= 60) {
    bigBoss.style.height = "565px";
    damage = Math.floor(Math.random() * 10); // boss blir større og hero dealer mindre dmg
  } else {
    damage = Math.floor(Math.random() * 30);
  }

  var heroName = ["Nameless Knight", "The Cat", "Julia the Archer"];
  var heroElements = [namelessKnight, theCat, juliaTheArcher];
  var randomHeroIndex = Math.floor(Math.random() * heroElements.length);
  var attackingHero = heroName[randomHeroIndex];
  var randomTarget = herosHp[randomHeroIndex];
  var newWidth = Math.max(0, bigBossHp.offsetWidth - damage);
  bigBossHp.style.width = `${newWidth}px`;

  updateOutput(
    `Julia angriper Big Boss og dealer ${damage} HP, Big boss angriper ${attackingHero} og dealer ${bossDamage}`
  );

  if (bigBossHp.offsetWidth <= 0) {
    // når boss = 0 HP --> YOU WIN
    bigBossHp.style.width = "0px";
    bigBoss.style.transform = "rotate(90deg)";
    bigBoss.style.transition = "all .3s ease-in-out";
    bigBoss.style.bottom = "-50px";
    outputDiv.style.background = "green";
    updateOutput(`YOU WIN!, Julia killed the boss`);
  } else if (juliaTheArcherHp.offsetWidth <= 0) {
    juliaTheArcher.style.pointerEvents = "none";
    juliaTheArcher.style.transform = "rotate(-90deg)";
    juliaTheArcher.style.transition = "all .3s ease-in-out";
    juliaTheArcher.style.bottom = "-40px";
    updateOutput(`The boss killed Julia!`);
  }
  bossAttack();
}

// funskjon når man klikker på en av heroene skal en liten monster dukke opp
function appearingMonster() {
  const randomChance = Math.floor(Math.random() * 100); // generere tilfeldige nummer fra 1 til 100

  if (bigBossHp.offsetWidth <= 0) {
    return;
  }

  // Noen ganger (med sannsynlighet på 25%) etter at man har gjort et angrep vil en Slime eller Bat dukke opp.
  if (randomChance <= 25) {
    appearingBat.style.visibility = "visible";
    appearingSlime.style.visibility = "hidden";
  } else if (randomChance >= 75) {
    appearingSlime.style.visibility = "visible";
    appearingBat.style.visibility = "hidden";
  } else {
    appearingBat.style.visibility = "hidden";
    appearingSlime.style.visibility = "hidden";
  }
}

namelessKnight.onclick = function () {
  if (
    appearingSlime.style.visibility === "visible" ||
    appearingBat.style.visibility === "visible"
  ) {
    knightAttack();
    bossAttack();
    return;
  } else {
    appearingMonster();
    knightAttack();
  }
};

theCat.onclick = function () {
  if (
    appearingSlime.style.visibility === "visible" ||
    appearingBat.style.visibility === "visible"
  ) {
    appearingSlime.style.visibility = "hidden";
    bossAttack();
  } else {
    catAttack();
    appearingMonster();
  }
};

juliaTheArcher.onclick = function () {
  if (
    appearingBat.style.visibility === "visible" ||
    appearingSlime.style.visibility === "visible"
  ) {
    appearingBat.style.visibility = "hidden";
    bossAttack();
  } else {
    juliaAttack();
    appearingMonster();
  }
};
