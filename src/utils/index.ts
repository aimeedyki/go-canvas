const getColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const generateData = () => {
  const noOfNodes = 100;
  const noOfLinks = noOfNodes/2;
  const nodes = [];
  const links = [];
  for (let i = 1; i <= 100; i += 1) {
    nodes.push({
      key: i,
      color: getColor(),
    });
    
    if (i<= noOfLinks){
      links.push({ key: i * -1, from: i, to: i + noOfLinks, text: `${i} to ${i + noOfLinks}` });
    }
  }

  return { nodes, links };
};

export const data = generateData();
