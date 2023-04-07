// src/Chat.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, MessagesContainer, InputContainer, Input, Button, MessageWrapper, UserMessage, AIMessage, ErrorMessage } from './Chat.styles';

type Message = { message: string; sender: string }

const openAIChat = async (message: string) => {
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY //'your-openai-api-key';

    const instance = axios.create({
        baseURL: 'https://api.openai.com',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    const response = await instance.post('/v1/chat/completions', { // エンドポイントを変更
        model: 'gpt-3.5-turbo',
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message }
        ],
        temperature: 0.8,
        max_tokens: 50,
    });

    return response.data.choices[0].message.content.trim();
};

const Chat: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = { sender: 'User', message: inputValue };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await openAIChat(inputValue);
            const aiMessage: Message = { sender: 'AI', message: response };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);

            setError(null);
        } catch (error) {
            console.log(error)
            setError('メッセージの送信中にエラーが発生しました。');
        }

        setInputValue('');
    };

    return (
        <Container>
            <MessagesContainer>
                {messages.map((message, index) => (
                    <MessageWrapper key={index} isUser={message.sender === 'User'}>
                        {message.sender === 'User' ? (
                            <UserMessage>{message.message}</UserMessage>
                        ) : (
                            <AIMessage>{message.message}</AIMessage>
                        )}
                    </MessageWrapper>
                ))}
            </MessagesContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <InputContainer>
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="メッセージを入力してください..."
                />
                <Button onClick={handleSendMessage}>送信</Button>
            </InputContainer>
        </Container>
    );
};

export default Chat;
