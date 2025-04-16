import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

import { UserAccount } from './user-account.entity';
import { IntegerColumn, JsonColumn, TextColumn, AuditDataEntity, StringColumn } from '../shared';

@Entity('user_preference')
@Unique(['user_account_id', 'preference_lookup_key'])
export class UserPreference extends AuditDataEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @IntegerColumn()
    user_account_id!: number;

    @StringColumn({
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
