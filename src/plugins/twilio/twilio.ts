import twilio from 'twilio';
import secrets from '../../utils/secrets';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = secrets;

export const twilioClient = twilio(`${TWILIO_ACCOUNT_SID}`, `${TWILIO_AUTH_TOKEN}`);
