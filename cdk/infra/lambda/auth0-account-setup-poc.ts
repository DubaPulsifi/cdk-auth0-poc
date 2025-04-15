import { SQSEvent } from 'aws-lambda';
import { ICreateAuth0UserDto, WebApp } from '../../../src/shared';
import { createAuth0User, sendUserInviteEmail, updateUser } from '../../../src/services';

export const handler = async (event: SQSEvent): Promise<void> => {
    for (const record of event.Records) {
        try {
            // Access to queue URL via environment variable
            console.log('Processing message for queue:', process.env.QUEUE_URL);
            console.log('Message:', record.body);
            
            // Your processing logic here
            const payload: ICreateAuth0UserDto = JSON.parse(record.body);
            const auth0User = await createAuth0User(payload.data, payload.tenant);
            const updatedUser = await updateUser({
                auth0Id: auth0User.user_id as string,
                userAccountId: parseInt(payload.data.user_id as string),
                email: payload.data.email as string,
                picture: payload.data.picture as string
            });

            console.log('Created Auth0 User:', auth0User);

            await sendUserInviteEmail(
            WebApp.EMPLOYEE,
            updatedUser, {
                companyId: payload.company.id,
                companyName: payload.company.name
            });

            await sendUserInviteEmail(
                WebApp.TALENT,
                updatedUser, {
                    companyId: payload.company.id,
                    companyName: payload.company.name
                });

        } catch (error) {
            console.error('Error processing message:', error);
            throw error; // Will return message to queue
        }
    }
};
