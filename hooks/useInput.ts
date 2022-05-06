import React, { useState } from 'react';

type EventHandler = React.ChangeEventHandler<HTMLInputElement>;

const useInput = (
  initialValue?: string,
  validator?: (value: string) => boolean,
): [string, EventHandler, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(initialValue ?? '');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    if (validator === undefined) {
      setValue(value);
    } else {
      const willUpdate = validator(value);
      if (willUpdate) {
        setValue(value);
      }
    }
  };

  return [value, onChange, setValue];
};

export default useInput;
