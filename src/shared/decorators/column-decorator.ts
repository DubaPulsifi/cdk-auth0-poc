import { Column, ColumnOptions, ColumnType } from 'typeorm';

type DbType = 'postgres' | 'sqlite';

type ColumnTypeMapping = {
  [P in ColumnType as string]?: ColumnType;
};

const dbColumnTypesMappings: Record<DbType, ColumnTypeMapping> = {
  postgres: {
    varchar: 'varchar',
    datetime: 'timestamp',
    ['simple-array']: 'varchar',
    enum: 'enum',
  },
  sqlite: {
    varchar: 'simple-array',
    timestamp: 'datetime',
    enum: 'text',
  },
};

export const getColumnType = (type?: ColumnType): ColumnType | undefined => {
  if (!type) {
    return undefined;
  }

  const dbType: DbType = process.env.VITEST ? 'sqlite' : 'postgres';

  return dbColumnTypesMappings[dbType]?.[type as string] ?? type;
};

export const Column2 = (options?: ColumnOptions): PropertyDecorator => {
  return Column({
    ...options,
    type: getColumnType(options?.type),
  });
};

export const DateColumn = (options?: ColumnOptions): PropertyDecorator => {
  return Column({
    ...options,
    type: getColumnType('date'),
  });
};

export const DateTimeColumn = (options?: ColumnOptions): PropertyDecorator => {
  const isTestEnv = !!process.env.VITEST;

  return Column({
    ...options,
    type: getColumnType('timestamp'),
    transformer: isTestEnv
      ? {
          to: (value: Date | null) =>
            value
              ? value.toISOString()
              : options?.nullable
                ? null
                : new Date().toISOString(),
          from: (value: string | null) => (value ? new Date(value) : null),
        }
      : undefined,
  });
};

export const IntegerColumn = (options?: ColumnOptions): PropertyDecorator => {
  return Column({
    ...options,
    type: 'integer',
  });
};

export const UuidColumn = (options?: ColumnOptions): PropertyDecorator => {
  return Column({
    ...options,
    type: 'uuid',
  });
};

export const TextColumn = (options?: ColumnOptions): PropertyDecorator => {
  return Column({
    ...options,
    type: 'text',
  });
};

export const ArrayColumn = (options?: ColumnOptions): PropertyDecorator => {
  return Column({
    ...options,
    type: getColumnType(options?.type ?? 'varchar'),
    array: true,
  });
};

export const SoftDeleteColumn = (
  options?: ColumnOptions,
): PropertyDecorator => {
  return Column({
    ...options,
    type: 'boolean',
    default: false,
  });
};

export const JsonColumn = (options?: ColumnOptions): PropertyDecorator => {
  return Column({
    ...options,
    type: getColumnType(options?.type ?? 'simple-json'),
  });
};

export const EnumColumn = (options: ColumnOptions): PropertyDecorator => {
  return Column({
    ...options,
    type: getColumnType(options?.type ?? 'enum'),
  });
};
