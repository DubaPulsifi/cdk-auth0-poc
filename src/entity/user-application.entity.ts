import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserAccount } from './user-account.entity';
import { EnumColumn, IntegerColumn, TextColumn, AppModule, AuditDataEntity, WebApp, StringColumn  } from '../shared';

@Entity('user_application')
export class UserApplication extends AuditDataEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @IntegerColumn({
        nullable: true,
    })
    company_id?: number;

    @IntegerColumn()
    user_account_id!: number;

    @IntegerColumn()
    app_id!: number;

    @EnumColumn({
        enum: WebApp,
    })
    app!: WebApp;

    @StringColumn({
        length: 100,
    })
    role!: string;

    @EnumColumn({
        enum: AppModule,
    })
    module!: AppModule;

    @ManyToOne(
        () => UserAccount,
        (userAccount) => userAccount.user_applications,
    )
    @JoinColumn({ name: 'user_account_id' })
    user_account?: UserAccount;
}
