import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

import { UserAccount } from './user-account.entity';
import { IntegerColumn, JsonColumn, TextColumn, AuditDataEntity } from '../shared';

@Entity()
@Unique(['user_account_id', 'preference_lookup_key'])
export class UserPreference extends AuditDataEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @IntegerColumn()
    user_account_id!: number;

    @TextColumn({
        length: 50,
    })
    preference_lookup_key!: string;

    @JsonColumn( {
        nullable: true,
    })
    preference_settings?: object;

    @ManyToOne(
        () => UserAccount,
        (userAccount) => userAccount.user_preferences,
    )
    @JoinColumn({ name: 'user_account_id' })
    user_account?: UserAccount;
}
