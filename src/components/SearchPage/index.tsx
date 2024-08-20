import IconButton from '@/components/IconButton';
import Message, { MessageProps } from '@/components/Message';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from '../Button';

const SearchPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageParams, setMessageParams] = useState<
    ChatCompletionMessageParam[]
  >([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingMessages = localStorage.getItem('messages');
      if (existingMessages) {
        try {
          setMessageParams(JSON.parse(existingMessages));
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, []);

  // react-query에서 제공해주는것. 통신과 관련한 로직을 처리하는 Hook
  const { mutate, isPending } = useMutation<
    ChatCompletionMessageParam[],
    unknown,
    ChatCompletionMessageParam[]
  >({
    mutationFn: async (messages) => {
      const res = await axios.post('/api/completions', {
        messages,
      });
      return res.data.messages;
    },
    onSuccess: (data) => {
      setMessageParams(data);
      localStorage.setItem('messages', JSON.stringify(data));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      const inputValue = inputRef.current?.value;
      if (!inputValue) {
        alert('검색어를 입력해주세요.');
        return;
      }

      const nextMessages = [
        ...messageParams,
        {
          content: inputValue ?? ('' as string),
          role: 'user' as const,
        },
      ];

      setMessageParams(nextMessages);
      mutate(nextMessages);
      inputRef.current.value = '';
    },
    [isPending, messageParams, mutate],
  );

  const messagePropsList = useMemo(() => {
    return messageParams.filter(
      (param): param is MessageProps =>
        param.role === 'assistant' || param.role === 'user',
    );
  }, [messageParams]);

  const handleReset = useCallback(() => {
    if (window.confirm('대화를 초기화 하시겠습니까?')) {
      setMessageParams([]);
      localStorage.removeItem('messages');
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <Message content="무엇이든 물어보세요!" role="assistant" />
        {messagePropsList.map((props, index) => (
          <Message {...props} key={index} />
        ))}
        {isPending && <Message content="생각중..." role="assistant" />}
      </div>
      <div className="container mx-auto flex items-center gap-3 p-4 pb-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 items-center rounded-md border"
        >
          <input
            ref={inputRef}
            type="text"
            className="flex-1 rounded-md p-2 pl-3"
          />
          <IconButton Icon={AiOutlineSearch} type="submit" />
        </form>
        <Button className="block w-[120px]" type="button" onClick={handleReset}>
          대화 초기화
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
