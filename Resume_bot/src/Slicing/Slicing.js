const initialState = {
    chatHistory: [
        {text: "What's Your Name", position: 'right'},
        {text: "My Name is Kapil Modi", position: 'left'},
        {text: "What is your Email ID?", position: 'right'},
        {text:"[Kapil Modi](kapilmodi.656@gmail.com)", position: 'left'},
        
        {text: "What is your Address?", position: 'right'},
        {text: "I live in Jaipur, Rajasthan, India", position: 'left'},
        {text: "What is your GitHub Profile?", position: 'right'},
        {text: "My GitHub Profile is [KapilModi656](https://github.com/KapilModi656)", position: 'left'},
        {text: "What do you do?", position: 'right'},
        {text: "I am currently a Student and Tech Enthusiast", position: 'left'},
        {text: "What is your age?", position: 'right'},
        {text: "I am 18 years old", position: 'left'},
        {text: "What are Your Academic Qualifications", position: 'right'},
        {
            text: `| Qualification          | Year | Percentage/Rank | Institution             |\n|------------------------|------|-----------------|-------------------------|\n| 10th Standard          | 2022 | 91.67%           | Sand Dunes Academy(Jaipur) |\n| 12th Standard          | 2024 | 90.8%            | Vardhman International School(Jaipur)|\n| JEE Main               | 2024 | Rank 15,000      | -                       |\n| JEE Advanced           | 2024 | Rank 12,000      | -                       |\n| 1st Semester (MNIT Jaipur(EE)) | 2024 | 7.96 CGPA         | MNIT Jaipur             | `
                ,position: 'left'},
        {text: "What are your skills?", position: 'right'},
        {text: `| Skill                | Proficiency Level |\n|----------------------|-------------------|\n| Python               | Intermediate      |\n| C++                  | Intermediate      |\n| HTML/CSS             | Intermediate      |\n| JavaScript           | Intermediate      |\n| ReactJS              | Intermediate      |\n| NodeJS               | Intermediate      |\n| ExpressJS            | Intermediate      |
                `, position: 'left'},
        {text: "What are your projects?", position: 'right'},
        {text: `| Project Name         | Description                                                                 |Github-Link                |\n|----------------------|-----------------------------------------------------------------------------|--------------------------------|\n| Resume Bot           | Instead of Resume i created this from which you can ask anything about me   |[Resume-Bot](https://github.com/KapilModi656/Resume_bot) |
                
                `, position: 'left'},
        {text: "Feel Free to ask more Question about me:Kapil Modi", position: 'left'},



    ],

  };
  
  const chatHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        console.log('Previous State:', state);
        console.log('Action Payload:', action.payload);
        return {
          ...state,
          chatHistory: [...state.chatHistory, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default chatHistoryReducer;
