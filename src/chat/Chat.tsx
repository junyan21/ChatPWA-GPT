import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    MessagesContainer,
    InputContainer,
    Input,
    Button,
    MessageWrapper,
    UserMessage,
    AIMessage,
    ErrorMessage,
    SpinnerContainer,
    Spinner
} from './Chat.styles';

type Message = { content: string; role: string };

const openAIChat = async (messages: Message[]) => {
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY; //'your-openai-api-key';

    const instance = axios.create({
        baseURL: 'https://api.openai.com',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    const response = await instance.post('/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...messages],
        temperature: 0.8,
        // max_tokens: 50,
    });

    return response.data.choices[0].message.content.trim();
};

const Chat: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = { role: 'user', content: inputValue };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setLoading(true); // 通信開始前にローディング状態を true に設定

        try {
            const response = await openAIChat([...messages, userMessage]);
            const aiMessage: Message = { role: 'assistant', content: response };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);

            setError(null);
        } catch (error) {
            console.log(error);
            setError('メッセージの送信中にエラーが発生しました。');
        }

        setLoading(false); // 通信終了後にローディング状態を false に設定

        setInputValue('');
    };

    return (
        <Container>
            <MessagesContainer>
                {messages.map((message, index) => (
                    <MessageWrapper key={index} isUser={message.role === 'user'}>
                        {message.role === 'user' ? (
                            <UserMessage>{message.content}</UserMessage>
                        ) : (
                            <AIMessage>{message.content}</AIMessage>
                        )}
                    </MessageWrapper>
                ))}
                {loading && (
                    <SpinnerContainer>
                        <Spinner />
                    </SpinnerContainer>
                )}
            </MessagesContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <InputContainer>
                <Input value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="メッセージを入力してください..." />
                <Button onClick={handleSendMessage}>送信</Button>
            </InputContainer>
        </Container>
    );
};

export default Chat;
