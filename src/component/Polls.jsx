import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import axios from "axios";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  // fetch polls
  useEffect(() => {
    axios
      .get(`/polls`)
      .then((res) => {
        setPolls(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Poll fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleVote = async (pollId) => {
    if (!selectedChoice) return alert("অনুগ্রহ করে একটি অপশন নির্বাচন করুন");

    try {
      await axios.post(`/poll/vote`, {
        poll_id: pollId,
        poll_choice: selectedChoice,
        session_id: localStorage.getItem("session_id") || "guest",
      });

      setShowResult(true);
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  if (loading) {
    return <div><Skeleton height={330} width="100%" className="mt-2 mb-2" /></div>;
  }

  if (!polls || polls.length === 0) {
    return (
      <div className="online__vote">
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "17px 20px",
            fontSize: "18px",
          }}
        >
          দুঃখিত, জরিপের জন্য অপেক্ষা করুন।
        </div>
      </div>
    );
  }

  return (
    <div className="online__vote">
      <div className="heading text-center">
        <a href="/polls">অনলাইন ভোট</a>
      </div>

      <div className="body">
        {polls.map((poll) => (
          <div key={poll.id} className="poll-item">
            <div className="title mt-2 p-2">
              <h4>{poll.question}</h4>
            </div>

            {!showResult ? (
              <div className="vote__rate mt-2 p-2">
                {poll.choices?.map((choice) => (
                  <span className="rslt__nocmnts" key={choice.id}>
                    <label>
                      <input
                        type="radio"
                        className="me-1"
                        name={`poll_${poll.id}`}
                        value={choice.id}
                        checked={selectedChoice === choice.id}
                        onChange={() => setSelectedChoice(choice.id)}
                      />
                      {choice.poll_answer}
                    </label>
                  </span>
                ))}

                <div className="btn__vote text-center">
                  <button
                    className="btn btn__submit"
                    onClick={() => handleVote(poll.id)}
                  >
                    ভোট দিন
                  </button>
                </div>
              </div>
            ) : (
              <div className="vote-result text-center mt-3">
                {poll.choices?.map((choice) => {
                  const percent =
                    poll.total_vote > 0
                      ? ((choice.vote_count / poll.total_vote) * 100).toFixed(1)
                      : 0;
                  return (
                    <h5 key={choice.id}>
                      {choice.poll_answer}: <small>{percent}%</small>
                    </h5>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Polls;
