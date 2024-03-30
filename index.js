import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

const captions = [
    {
        id: 1,
        categories: "birthdays",
        content: "Another trip around the sun! 🎉 #BirthdayVibes",
    },
    {
        id: 2,
        categories: "birthdays",
        content: "Leveling up today! 🎂 #BirthdayCelebration",
    },
    {
        id: 3,
        categories: "birthdays",
        content: "Feeling blessed on my special day! 🎈 #BirthdayJoy",
    },
    {
        id: 4,
        categories: "birthdays",
        content: "Cheers to another year of growth and adventure! 🥳 #BirthdayBlessings",
    },
    {
        id: 5,
        categories: "birthdays",
        content: "Grateful for all the love and well wishes! 💕 #BirthdayGratitude",
    },
    {
        id: 6,
        categories: "birthdays",
        content: "Celebrating another year of blessings and memories! 🎁 #BirthdayCheers",
    },
    {
        id: 7,
        categories: "birthdays",
        content: "Age is just a number, but today it's a cause for celebration! 🎊 #BirthdayFun",
    },
    {
        id: 8,
        categories: "birthdays",
        content:  "Making memories and blowing out candles! 🕯️ #BirthdayWishes",
    },
    {
        id: 9,
        categories: "birthdays",
        content: "Thankful for another year of life's blessings! ✨ #BirthdayThankYou",
    },
    {
        id: 10,
        categories: "birthdays",
        content: "Another year older, wiser, and more fabulous! 💃 #BirthdayFabulous",
    },
    {
        id: 11,
        categories: "newMonth",
        content: "New month, new beginnings! 🌟 #HelloMarch",
    },
    {
        id: 12,
        categories: "newMonth",
        content:  "Welcoming [Month] with open arms and positive vibes! 🌺 #NewMonthNewGoals",
    },
    {
        id: 13,
        categories: "newMonth",
        content: "Turning the page to a fresh chapter! 📖 #NewMonthJourney",
    },
    {
        id: 14,
        categories: "newMonth",
        content:  "Ready to conquer the month ahead! 💪 #NewMonthMotivation",
    },
    {
        id: 15,
        categories: "newMonth",
        content: "Embracing the opportunities that [Month] brings! 💼 #NewMonthGoals",
    },
    {
        id: 16,
        categories: "newMonth",
        content: "Here's to a month filled with blessings and adventures! 🌈 #NewMonthBlessings",
    },
    {
        id: 17,
        categories: "newMonth",
        content: "Starting the month off with a smile and a grateful heart! 😊 #NewMonthGratitude",
    },
    {
        id: 18,
        categories: "newMonth",
        content: "A new month means new possibilities! 🌟 #NewMonthNewOpportunities",
    },
    {
        id: 19,
        categories: "newMonth",
        content: "Let's make [Month] a month to remember! 🎉 #NewMonthExcitement",
    },
    {
        id: 20,
        categories: "newMonth",
        content: "Wishing you a fantastic [Month] ahead! ✨ #NewMonthWishes"
    },
    {
        id: 21,
        categories: "anniversary",
        content: "Celebrating [X] years of love and laughter! 💖 #AnniversaryJoy",
    },
    {
        id: 22,
        categories: "anniversary",
        content: "To many more years of partnership and adventure! 🥂 #AnniversaryCelebration",
    },
    {
        id: 23,
        categories: "anniversary",
        content: "Reflecting on [X] years of cherished memories! 📸 #AnniversaryReflection",
    },
    {
        id: 24,
        categories: "anniversary",
        content: "Another year of love, laughter, and happily ever after! 💑 #AnniversaryBliss",
    },
    {
        id: 25,
        categories: "anniversary",
        content: "Here's to the love that keeps growing stronger with each passing year! 💞 #AnniversaryLove",
    },
    {
        id: 26,
        categories: "anniversary",
        content: "Cheers to [X] years of friendship, love, and togetherness! 🎊 #AnniversaryCheers",
    },
    {
        id: 27,
        categories: "anniversary",
        content: "Honoring the journey of [X] years together! 💍 #AnniversaryJourney",
    },
    {
        id: 28,
        categories: "anniversary",
        content: "Thankful for the love that continues to inspire and uplift us! 🙏 #AnniversaryGratitude",
    },
    {
        id: 29,
        categories: "anniversary",
        content: "Celebrating the milestones and memories of [X] wonderful years! 🌟 #AnniversaryMemories",
    },
    {
        id: 30,
        categories: "anniversary",
        content: "Raising a toast to the love story that keeps getting better with time! 🥂 #AnniversaryToast",
    },
]

let lastId = 30;

// Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Get Random Caption
app.get("/random", (req,res)=> {
const randomBirthday = Math.floor(Math.random() * captions.length);
console.log(captions[randomBirthday])
res.json(captions[randomBirthday])
})

// Get Caption by id
app.get("/captions/:id", (req,res)=> {
    const id = parseInt(req.params.id)
    const caption = captions.find((c)=> c.id === id);
    if(!caption) {
        return res.status(404).json({message: "Caption not found"})
    }
    res.json(caption)
    })
// Post a new Caption
app.post("/captions", (req,res)=> {
    const id = lastId += 1;
    const newCaption = {
        id: id,
        categories: req.body.categories,
        content: req.body.content,
    }
    lastId = id;
captions.push(newCaption)
res.status(200).json(newCaption)

})
app.patch("/captions/:id", (req,res)=> {
const id = parseInt(req.params.id);
const caption = captions.find((c)=> c.id === id)
if (!caption) return res.status(404).json({ message: "Post not found" });
const newCaption = {
    id: id,
        categories: req.body.categories || caption.categories,
        content: req.body.content || captions.content ,
}
res.json(newCaption)
})

// Delete a specific post
app.delete("/captions/:id", (req,res)=> {
const id = parseInt(req.params.id)
const index = captions.findIndex((c)=> c.id === id)
if(id === -1) {
    return res.status(404).json({ message: "Post not found" });  
}

captions.splice(index, 1)
res.json({message: "Post has been deleted"})
})
app.listen(port, ()=> {
    console.log(`Backend server is running on http://localhost:${port}`)
})