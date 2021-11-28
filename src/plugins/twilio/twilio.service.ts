import secrets from '../../utils/secrets';
import { twilioClient } from './twilio';

/**
 * Twilio Service
 */
export class TwilioService {
  /**
   * send verification code
   * @param { to: string } - phone number or email to send to
   * @param { channel: string } - channel -> email or sms
   * @returns Promise - Twilio response
   * @memberOf TwilioService
   */
  sendVerificationCode = (to: string, channel: string): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        const res = twilioClient.verify.services(`${secrets.TWILIO_SERVICE_SID}`).verifications.create({
          to,
          channel,
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });

  /**
   * verify code
   * @param { to: string } - phone number or email used to send code
   * @param { code: string } - code to verify
   * @returns Promise - Twilio response
   * @memberOf TwilioService
   */
  verifyCode = (to: string, code: string): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        const res = twilioClient.verify.services(`${secrets.TWILIO_SERVICE_SID}`).verificationChecks.create({
          to,
          code,
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
}
