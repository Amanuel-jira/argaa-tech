

function chunkText(text, chunkSize = 220, overlap = 40) {
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  const chunks = [];
  let i = 0;
  while (i < words.length) {
    const slice = words.slice(i, i + chunkSize).join(' ');
    if (slice.trim()) chunks.push(slice);
    i += chunkSize - overlap;
  }
  return chunks;
}

const STOPWORDS = new Set([
  'the','a','an','is','are','was','were','be','been','of','and','or','to',
  'in','on','for','with','that','this','it','as','by','at','from','we',
  'our','your','you','i','do','does','did','what','how','why','which',
  'can','will','would','should','have','has','had',
]);

function scoreChunk(chunk, questionWords) {
  const chunkWords = chunk.toLowerCase().split(/\W+/);
  const chunkSet = new Set(chunkWords);
  let score = 0;
  for (const w of questionWords) if (chunkSet.has(w)) score += 1;
  return score;
}

function topChunks(chunks, question, k = 4) {
  const questionWords = question
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));

  return chunks
    .map((c) => ({ content: c.content, score: scoreChunk(c.content, questionWords) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .filter((c) => c.score > 0)
    .map((c) => c.content);
}

module.exports = { chunkText, topChunks };
