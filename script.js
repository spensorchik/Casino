const play = document.querySelector("#play")
const s1 = document.querySelector("#slot1")
const s2 = document.querySelector("#slot2")
const s3 = document.querySelector("#slot3")
const inp = document.querySelector("#input")
const cashLabel = document.querySelector("#cashLabel")
let cash = 1000

const slots = [
    //(~50%)
    "🍒", "🍒", "🍒", "🍒", "🍒", "🍒", "🍒", "🍒",
    "🍋", "🍋", "🍋", "🍋", "🍋", "🍋", "🍋", "🍋",

    //(~35%)
    "🍊", "🍊", "🍊", "🍊", "🍊",
    "🍇", "🍇", "🍇", "🍇", "🍇",
    "🍉", "🍉", "🍉", "🍉",

    //(~12.5%)
    "🔔", "🔔", "🔔",
    "💎", "💎",

    //(2.5%)
    "7️⃣"
]

cashLabel.textContent = `${cash}$`
s1.textContent = randomSlot()
s2.textContent = randomSlot()
s3.textContent = randomSlot()

function randomSlot() {
    const rIndex = Math.floor(Math.random() * slots.length)
    const slot = slots[rIndex]
    return slot
}
function updateCashLabel () {
    cashLabel.textContent = `${cash}$`
}


play.onclick = function () {
    if (play.textContent != "!!") {
        const stavka = inp.value
        if (stavka < 0) {return}
        if (stavka > cash && stavka == 0) {
            inp.style.color = "red"
        } else if (stavka == "") {
            inp.style.color = "red"
        } else if (stavka <= cash) {
            inp.style.color = "#cac3e9"
            play.textContent = "!!"
            const wheel = setInterval(function () {
                s1.textContent = randomSlot()
                s2.textContent = randomSlot()
                s3.textContent = randomSlot()
            }, 500)
            setTimeout(function () {
                clearInterval(wheel)
                if (s1.textContent == "7️⃣" && s2.textContent == "7️⃣" && s3.textContent == "7️⃣") {
                    cash += stavka * 5
                    inp.style.color = "green"
                    updateCashLabel()
                }  else if (s1.textContent == s2.textContent && s1.textContent == s3.textContent && s2.textContent == s3.textContent) {
                    cash += stavka * 2
                    inp.style.color = "green"
                    updateCashLabel()
                } else if (s1.textContent == s2.textContent || s2.textContent == s3.textContent) {
                    cash += stavka * 1.5
                    inp.style.color = "green"
                    updateCashLabel()
                } else if (s1.textContent == s2.textContent || s1.textContent == s3.textContent || s2.textContent == s3.textContent) {
                    inp.style.color = "yellow"
                } else {
                    cash -= stavka
                    updateCashLabel()
                    inp.style.color = "red"
                }
                play.textContent = "Крутка"
            }, 1500)
    }
    }
}
