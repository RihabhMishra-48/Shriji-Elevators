const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function run() {
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.models) {
      const names = data.models.map(m => m.name);
      const flash15 = names.filter(n => n.includes('1.5-flash'));
      const flash25 = names.filter(n => n.includes('2.5-flash'));
      console.log("Flash 1.5:", flash15.join(', '));
      console.log("Flash 2.5:", flash25.join(', '));
    } else {
      console.log(JSON.stringify(data));
    }
  } catch (err) {
    console.error(err);
  }
}

run();
