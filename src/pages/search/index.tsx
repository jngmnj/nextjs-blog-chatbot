import IconButton from '@/components/IconButton';
import Message, { MessageProps } from '@/components/Message';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageParams, setMessageParams] = useState<
    ChatCompletionMessageParam[]
  >([]);

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

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <Message content="무엇이든 물어보세요!" role="assistant" />
        {messagePropsList.map((props, index) => (
          <Message {...props} key={index} />
        ))}
        {isPending && <Message content="생각중..." role="assistant" />}
      </div>
      <div className="container mx-auto p-4 pb-12">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-md border"
        >
          <input
            ref={inputRef}
            type="text"
            className="flex-1 rounded-md p-2 pl-3"
          />
          <IconButton Icon={AiOutlineSearch} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Search;
