import React from 'react';
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Import a highlight.js theme
import './chat.css';
import remarkGfm from 'remark-gfm';

const Chat = ({ text, position }) => {
    return (
        <div
            className={`chat-container ${
                position === 'left' ? 'left' : 'right'
            }`}
        >
            <div className="chat-bubble">
                <Markdown
                    rehypePlugins={[rehypeHighlight]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({ node, ...props }) => (
                            <p className="markdown-content" {...props} />
                        ),
                        code: ({ node, inline, className, children, ...props }) => (
                            <code
                                className={`markdown-code ${className || ''}`}
                                {...props}
                            >
                                {children}
                            </code>
                        ),
                        table: ({ node, ...props }) => (
                            <table className="markdown-table" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                            <th className="markdown-table-header" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                            <td className="markdown-table-cell" {...props} />
                        ),
                    }}
                >
                    {text}
                </Markdown>
            </div>
        </div>
    );
};

export default Chat;
