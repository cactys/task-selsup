import React from 'react';
import styles from './ParamEditor.module.css';

export interface Param {
  id: number;
  name: string;
  type: 'string' | 'number' | 'list';
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

export interface Props {
  params: Param[];
  model: Model;
}

export interface State {
  model: Model;
}

export class ParamEditor extends React.Component<Props, State> {
  // Сохранить модель в state
  state = {
    model: this.props.model,
  };

  // Обработать изменение значения параметра
  handleChange = (paramId: number, value: string) => {
    const { model } = this.state;

    // Найти измененный параметр в модели
    const paramIndex = model.paramValues.findIndex(
      (paramValue) => paramValue.paramId === paramId
    );

    const newModel = () => {
      if (paramIndex !== -1) {
        const newParamValues = [...model.paramValues];
        newParamValues[paramIndex] = { paramId, value };
        return { ...model, paramValues: newParamValues };
      } else {
        // Создать новый объект модели с обновленным значением
        return {
          ...model,
          paramValues: [...model.paramValues, { paramId, value }],
        };
      }
    };

    // Обновить модель в state
    this.setState({ model: newModel() });
  };

  // Вернуть модель
  public getModel(): Model {
    return this.state.model;
  }

  render() {
    const { params } = this.props;
    const { paramValues, colors } = this.state.model;

    return (
      <div className={styles.wrapper}>
        {params.map((param) => {
          const value = paramValues.find(
            (pv) => pv.paramId === param.id
          )?.value;

          return param.type !== 'list' ? (
            <div className={styles.block} key={param.id}>
              <label className={styles.label}>{param.name}</label>
              <input
                type={param.type}
                value={value || ''}
                onChange={(e) => this.handleChange(param.id, e.target.value)}
              />
            </div>
          ) : (
            <div className={styles.block} key={param.id}>
              <label className={styles.label}>{param.name}</label>
              <select className={styles.select}>
                {param.name}
                {colors.map((cl) => {
                  return (
                    <option value={cl.value} key={cl.value}>
                      {cl.value}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </div>
    );
  }
}
