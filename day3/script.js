// Starting notes data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
function searchNotes(word) {
  return notes.filter(n =>
    n.text.toLowerCase().includes(word.toLowerCase())
  );
}
console.log(searchNotes("milk")); // [{ id: 1, text: "Buy milk and bread", category: "personal" }]
console.log(searchNotes("xyz"));  // []


// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, current) =>
    current.text.length > longest.text.length ? current : longest
  );
}
console.log(longestNote()); // { id: 3, text: "Email the project report to Grace", category: "work" }


// 3. countByCategory()
function countByCategory() {
  const counts = {};
  for (const n of notes) {
    counts[n.category] = (counts[n.category] || 0) + 1;
  }
  return counts;
}
console.log(countByCategory()); // { personal: 2, work: 1, study: 2 }


// 4. getSummary()
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const parts = Object.entries(counts)
    .map(([cat, num]) => `${num} ${cat}`)
    .join(", ");
  const word = total === 1 ? "note" : "notes";
  return `${total} ${word}: ${parts}.`;
}
console.log(getSummary()); // "5 notes: 2 personal, 1 work, 2 study."


// 5. isDuplicate(text)
function isDuplicate(text) {
  const normalized = text.trim().toLowerCase();
  return notes.some(n => n.text.trim().toLowerCase() === normalized);
}
console.log(isDuplicate("buy milk and bread")); // true
console.log(isDuplicate("New note")); // false


// 6. addNote(text, category)
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  const trimmed = text.trim();

  if (trimmed.length < 1 || trimmed.length > 200) {
    console.log("Invalid length.");
    return false;
  }
  if (!validCategories.includes(category)) {
    console.log("Invalid category.");
    return false;
  }
  if (isDuplicate(trimmed)) {
    console.log("Duplicate note.");
    return false;
  }

  const newNote = {
    id: notes.length + 1,
    text: trimmed,
    category
  };
  notes.push(newNote);
  console.log("Note added:", newNote);
  return true;
}
console.log(addNote("Buy milk and bread", "personal")); // false (duplicate)
console.log(addNote("Plan weekend trip", "personal"));  // true
