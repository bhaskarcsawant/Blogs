import { Request, Response } from 'express';
import Form from '../models/form';
import { sqs } from '../helpers/awsHelper';

interface FormBody {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  workflows?: string[];
}

type params = {
  MessageBody: string;
  QueueUrl: string;
};

export const createFormSubmission = async (req: Request<{}, {}, FormBody>, res: Response): Promise<void> => {
  try {
    const { customerName, customerEmail, customerPhone } = req.body;
    const newForm = new Form({ customerName, customerEmail, customerPhone });
    await newForm.save();

    // Prepare the data to be sent to the workflow
    let workflowData = {
      app: 'forms',
      type: 'new_submission',
      data: newForm,
    }
    
    let params: params = {
      MessageBody: JSON.stringify(workflowData),
      QueueUrl: process.env.AWS_SQS_URL as string,
    };

    // Send the message
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.MessageId);
      }
    });
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
