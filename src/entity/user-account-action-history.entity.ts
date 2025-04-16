import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserAccount } from './user-account.entity';
import { IntegerColumn, JsonColumn, TextColumn, AuditDataEntity, StringColumn } from '../shared';

@Entity('user_account_action_history')
export class UserAccountActionHistory extends AuditDataEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @IntegerColumn()
    user_account_id!: number;

    @StringColumn({
        length: 100,
    })
    action_type!: string;

    @JsonColumn({
        nullable: true,
    })
    value?: object;

    @StringColumn({
        length: 255,
    })
    created_username!: string;

    @ManyToOne(
        () => UserAccount,
        (userAccount) => userAccount.user_applications,
    )
    @JoinColumn({ name: 'user_account_id' })
    user_account?: UserAccount;
}
