
// This service handles interactions with the OpenAI API
// NOTE: For production, this should be handled via a secure backend (e.g. Supabase Edge Functions)
// to avoid exposing API keys in the client.

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface AICoachResponse {
  summary: string;
  advice: string;
  tone: "encouraging" | "strict" | "analytical";
}

const SYSTEM_PROMPT = `
당신은 'AI 검도 사범'입니다. 당신의 이름은 '정심(正心)'입니다.
당신은 수련생의 자세 데이터를 분석하고, 엄격하면서도 따뜻한 조언을 제공합니다.
검도 용어(존심, 기검체일치, 중단세, 타돌 등)를 적절히 사용하여 전문성을 드러내세요.
답변은 항상 한국어로 하고, 마크다운 형식을 사용할 수 있습니다.

입력 데이터 예시:
- 수련 시간: 10분
- 평균 정확도: 85%
- 주요 이슈: 왼쪽 어깨 올라감 (5회), 허리 구부정함 (3회)

출력 형식 (JSON):
{
  "summary": "오늘 수련에 대한 전반적인 평가",
  "advice": "구체적인 교정 조언 및 격려",
  "tone": "encouraging" | "strict" | "analytical"
}
`;

export const getAICoachingCallback = async (sessionData: any): Promise<AICoachResponse> => {
  if (!API_KEY) {
    console.warn("OpenAI API Key is missing. Returning mock data.");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                summary: "API 키가 설정되지 않았습니다. (Mock) 오늘 수련은 전반적으로 훌륭했습니다. 기검체일치가 돋보이는 하루였습니다.",
                advice: "API 키를 .env 파일에 VITE_OPENAI_API_KEY로 설정해주세요. 그래야 제가 진정한 조언을 드릴 수 있습니다.",
                tone: "analytical"
            });
        }, 1500);
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // or gpt-3.5-turbo
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `수련 데이터: ${JSON.stringify(sessionData)}` }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    
    return content as AICoachResponse;

  } catch (error) {
    console.error("AI Coaching Error:", error);
    return {
        summary: "AI 사범님과 연결이 원활하지 않습니다.",
        advice: "잠시 후 다시 시도해보시거나, 네트워크 연결을 확인해주세요.",
        tone: "strict"
    };
  }
};

/**
 * Real-time coaching for quick feedback during live session
 */
export const getRealtimeCoaching = async (
  joints: Array<{ name: string; angle: number; targetAngle: number; deviation: number; status: string }>,
  overallAccuracy: number
): Promise<string> => {
  if (!API_KEY) {
    // Return rule-based fallback when no API key
    const worstJoint = joints.find(j => j.status === 'poor') || joints.find(j => j.status === 'fair');
    if (worstJoint) {
      return `${worstJoint.name}에 집중하세요. 현재 ${worstJoint.angle}°이며, 목표는 ${worstJoint.targetAngle}°입니다.`;
    }
    return '자세를 유지하세요!';
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using faster model for realtime
        messages: [
          { 
            role: "system", 
            content: `당신은 검도 사범 '정심(正心)'입니다. 
실시간 자세 교정 피드백을 1-2문장으로 간결하게 제공합니다.
검도 용어를 적절히 사용하고, 격려와 교정을 균형있게 담아주세요.
한국어로만 답변하세요. 마크다운 사용 금지.` 
          },
          { 
            role: "user", 
            content: `현재 자세 분석:
전체 정확도: ${overallAccuracy}%
관절 상태: ${joints.map(j => `${j.name}: ${j.angle}°(목표 ${j.targetAngle}°, ${j.status})`).join(', ')}

즉각적인 교정 조언을 1-2문장으로:` 
          }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error("Realtime Coaching Error:", error);
    // Fallback to simple rule-based feedback
    const worstJoint = joints.find(j => j.status === 'poor') || joints.find(j => j.status === 'fair');
    if (worstJoint) {
      return `${worstJoint.name}에 집중하세요.`;
    }
    return '좋습니다! 자세를 유지하세요.';
  }
};

