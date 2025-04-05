import React from 'react';

const Chat = ({key,text,position}) => {
    return (
        <div>
            <div className={`chat-bubble ${position}`} id={key}>
                <p >{text}</p>
            </div>
            <style jsx>{`
                .chat-bubble {
                    max-width: 60%;
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 10px;
                    font-size: 14px;
                    line-height: 1.5;
                }
                .chat-bubble.left {
                    background-color: #e0e0e0;
                    color: #000;
                    align-self: flex-start;
                }
                .chat-bubble.right {
                    background-color: #0078d4;
                    color: #fff;
                    align-self: flex-end;
                }
            `}</style>
        </div>
    );
};

export default Chat;