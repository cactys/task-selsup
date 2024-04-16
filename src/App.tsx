import React, { createRef, useState } from 'react';
import { Model, Param, ParamEditor } from './ParamEditor';
import styles from './App.module.css';

const App = () => {
  const [params, setParams] = useState<Param[]>([
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
    { id: 3, name: 'Цвет', type: 'list' },
  ]);
  const [model, setModel] = useState<Model>({
    paramValues: [
      { paramId: 1, value: '' },
      { paramId: 2, value: '' },
    ],
    colors: [
      // { paramId: 1, value: 'Красный' },
      // { paramId: 2, value: 'Синий' },
      // { paramId: 3, value: 'Черный' },
    ],
  });

  const editorRef = createRef<ParamEditor>();

  const handleSubmit = () => {
    setModel(editorRef?.current?.getModel() as Model);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.container}>
          {model.paramValues.map((item) => {
            return (
              <p key={item.paramId} className={styles.text}>
                {item.value}
              </p>
            );
          })}
        </div>
        <ParamEditor ref={editorRef} params={params} model={model} />
        <button className={styles.button} onClick={handleSubmit}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default App;
