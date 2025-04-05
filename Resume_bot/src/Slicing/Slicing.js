const initialState = {
    chatHistory: [
        {text: "What's Your Name", position: 'right'},
        {text: "My Name is Kapil Modi", position: 'left'},
        {text: "What is your Email ID?", position: 'right'},
        {text:"kapilmodi.656@gmail.com", position: 'left'},
        
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
            text: `
                | Qualification          | Year | Percentage/Rank | Institution             |
                |------------------------|------|-----------------|-------------------------|
                | 10th Standard          | 2022 | 91.67%           | [School Name -  Add if known] |
                | 12th Standard          | 2024 | 90.8%            | [School Name - Add if known] |
                | JEE Main               | 2024 | Rank 15,000      | -                       |
                | JEE Advanced           | 2024 | Rank 12,000      | -                       |
                | 1st Semester (MNIT Jaipur) | 2024 | 7.96 CGPA         | MNIT Jaipur             | `
                ,position: 'left'},
        {text: "What are your skills?", position: 'right'},
        {text: `
                | Skill                | Proficiency Level |
                |----------------------|------------------|
                | Python               | Intermediate      |
                | C++                  | Intermediate      |
                | HTML/CSS             | Intermediate      |
                | JavaScript           | Intermediate      |
                | ReactJS              | Intermediate      |
                | NodeJS               | Intermediate      |
                | ExpressJS            | Intermediate      |
                `, position: 'left'},
        {text: "What are your projects?", position: 'right'},
        {text: `
                | Project Name         | Description                                                                 |
                |----------------------|-----------------------------------------------------------------------------|
                | Resume Bot           | Instead of Resume i created this from which you can ask anything about me   |
                
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
