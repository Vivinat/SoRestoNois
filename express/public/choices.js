const choicesContainer = document.querySelector('.choicesContainer');
const choiceButtons = choicesContainer.querySelectorAll('button');

const choicesIds = text.choices;

for (let i = 0; i < choicesIds.length && i < choiceButtons.length; i++) {
  const choiceId = choicesIds[i];
  const choice = await client.db('TextDatabase').collection('_choices').findOne({ _id: choiceId });
  if (!choice) {
    console.error(`Choice with ID ${choiceId} not found.`);
    continue;
  }
  const choiceText = choice.text;
  choiceButtons[i].textContent = choiceText;
}