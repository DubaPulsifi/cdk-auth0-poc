import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserAccount } from './user-account.entity';
import { IntegerColumn, JsonColumn, TextColumn, AuditDataEntity } from '../shared';

@Entity()
export class UserAccountActionHistory extends AuditDataEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @IntegerColumn()
    user_account_id!: number;

    @TextColumn({
        length: 100,
    })
    action_type!: string;

    @JsonColumn({
        nullable: true,
    })
    value?: object;

    @TextColumn({
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
