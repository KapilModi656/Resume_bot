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
            <div className="chat-bubble-wrapper">
                <div className="chat-bubble" style={{ position: 'relative' }}>
                    
                    <Markdown
                        rehypePlugins={[rehypeHighlight]}
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ node, ...props }) => (
                                <p className="markdown-content" {...props} style={{ margin: 0 }} />
                            ),
                            code: ({ node, inline, className, children, ...props }) => (
                                <div
                                    className="code-block-container"
                                    style={{
                                        backgroundColor: '#f6f8fa',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginTop: '8px',
                                    }}
                                >
                                    <code
                                        className={`markdown-code ${className || ''}`}
                                        {...props}
                                        style={{
                                            display: 'block',
                                            overflowX: 'auto',
                                            fontFamily: 'monospace',
                                        }}
                                    >
                                        {children}
                                    </code>
                                </div>
                            ),
                            table: ({ node, ...props }) => (
                                <table
                                    className="markdown-table"
                                    {...props}
                                    style={{
                                        borderCollapse: 'collapse',
                                        width: '100%',
                                        marginTop: '16px',
                                    }}
                                />
                            ),
                            th: ({ node, ...props }) => (
                                <th
                                    className="markdown-table-header"
                                    {...props}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        backgroundColor: '#f2f2f2',
                                        textAlign: 'left',
                                    }}
                                />
                            ),
                            td: ({ node, ...props }) => (
                                <td
                                    className="markdown-table-cell"
                                    {...props}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'left',
                                    }}
                                />
                            ),
                        }}
                    >
                        {text}
                    </Markdown>
                    <button
                        className="copy-button"
                        onClick={() => {
                            navigator.clipboard.writeText(text);
                            alert('Text copied to clipboard!');
                        }}
                        title="Copy to clipboard"
                        style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            color: '#007bff',
                        }}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
