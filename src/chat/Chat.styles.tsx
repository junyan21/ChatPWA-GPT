// src/Chat.styles.tsx
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 100%;
  max-height: 800px;
  background-color: #f5f5f5;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

export const Input = styled.textarea`
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

export const Button = styled.button`
  margin-left: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0069d9;
  }
`;

export const MessageWrapper = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 1rem;
`;

export const UserMessage = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;

export const AIMessage = styled.div`
  background-color: #e0e0e0;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;

export const ErrorMessage = styled.div`
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #842029;
  padding: 0.75rem 1.25rem;
  margin: 1rem 0;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;