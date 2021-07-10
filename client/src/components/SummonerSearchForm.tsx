import React, { ChangeEvent, FormEvent, useState } from 'react';

type SummonerNameFormProps = {
  onSubmitSummonerName: (summonerName: string) => void;
};

function SummonerSearchForm({ onSubmitSummonerName }: SummonerNameFormProps) {
  const [input, setInput] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') return;
    onSubmitSummonerName(input);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form className="SummonerNameForm" onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={input}
        placeholder="소환사명을 입력하세요"
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default SummonerSearchForm;
