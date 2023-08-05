import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { isMobile } from "react-device-detect"
import Button from "./Button"
import InputField from "./InputField"
import { useStore } from "@/app/app/page"
import Image from "./Image"
import Link from "next/link"
import { useState } from "react"
import Eye from "./Eye"

export default function ArticleForm({ }) {
    const currentTab = useStore((state) => state.currentTab)
    const setCurrentTab = useStore((state) => state.setCurrentTab)
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)
    const linkToArticle = useStore((state) => state.linkToArticle)
    const setLinkToArticle = useStore((state) => state.setLinkToArticle)
    const [isLoading, setIsLoading] = useState(false)


    return (
        <>
            <div
                className={`relative bg-black p-6 flex flex-col
                ${isPlayerOpen ? `w-full lg:w-1/2` : `w-full`}
                `}
                style={{ transition: "all 0.5s" }}
            >
                <Link
                    href="/"
                    className="flex gap-2 items-center justify-center mt-2 mb-8"
                >
                    <span
                        className="material-icons-round text-4xl text-primary-800"
                    >
                        graphic_eq
                    </span>
                    <h3 className="text-primary-800 font-bold text-2xl">LISTEN</h3>
                </Link>
                <div className="flex w-max mx-auto mb-8 bg-primary-800/30 rounded-full">
                    <Button
                        type={currentTab == 1 ? `primary` : `tertiary`}
                        showHoverAnimation={false}
                        className="px-6 py-2"
                        onClick={() => setCurrentTab(1)}
                    >
                        Fetch article
                    </Button>
                    <Button
                        type={currentTab == 2 ? `primary` : `tertiary`}
                        showHoverAnimation={false}
                        className="px-6 py-2"
                        onClick={() => setCurrentTab(2)}
                    >
                        Paste article
                    </Button>
                </div>
                {currentTab == 1 &&
                    <div className="flex-grow animate__animated animate__fadeIn">
                        <div className={`relative mb-12 ${linkToArticle != "" && `animate__animated animate__pulse`}`}>
                            <InputField
                                placeholder="Link to article"
                                type="input-field"
                                value={linkToArticle}
                                onChange={(event) => { setLinkToArticle(event.value) }}
                            />
                            <Button
                                type="primary"
                                showHoverAnimation={false}
                                className="absolute right-0 rounded-l-none py-2 px-4 h-full"
                                onClick={() => {
                                    setIsLoading(true)
                                    setTimeout(() => {
                                        setIsLoading(false)
                                    }, 5000);
                                }}
                            >
                                Fetch
                            </Button>
                        </div>
                        <div
                            key={isLoading}
                            className="mt-60 cursor-pointer animate__animated animate__bounceIn"
                            onClick={() => setLinkToArticle("https://ideas.ted.com/how-to-handle-anxiety-lionel-messi/")}
                        >
                            <div
                                className={`flex gap-4 justify-center mx-auto w-min mb-6`}
                            >
                                <Eye whichEye="left" isLoading={isLoading} />
                                <Eye whichEye="right" isLoading={isLoading} />
                            </div>
                            <p

                                className="text-center text-primary-800 ">
                                {isLoading ? `Fetching, hold on...` : `Need a nice link?`}
                            </p>
                        </div>
                        {false && <div className="overflow-clip rounded-lg">
                            <div className="px-4 py-2 bg-primary-800/40 font-bold">
                                <p>Why Hybrid Work Can Become Toxic</p>
                            </div>
                            <div className="p-4 bg-primary-800/30 overflow-y-auto max-h-60 custom-scrollbar text-white/60">
                                <p>Toxicity can be an unfortunate reality of some work environments. Toxic cultures share five attributes: they’re disrespectful, noninclusive, unethical, cutthroat, and abusive. Undeniably negative as these attributes are, there is no absolute, uniformly accepted scale against which we can measure any of them. Making matters more complicated, a hybrid environment by definition means that employees are experiencing their work in very different contexts — some face-to-face, others remote — and those may vary by the day. As a result, hybrid workspaces aren’t uniform; some people may experience a hybrid environment as toxic while others do not. The author presents four mechanisms through which hybridity can lead to toxic behaviors, as well as four strategies for preventing and addressing toxic behavior in a hybrid environment.








                                    Tweet





                                    Post





                                    Share








                                    Annotate




                                    Save





                                    Print







                                    Toxicity at work — no matter where or how we do our jobs — is caused by a range of factors. It is important to recognize that some aspects of hybrid and remote work make toxicity more likely to occur.
                                    First, though, let’s quickly outline what “toxic” actually means. It doesn’t refer to the misunderstandings, tensions, and conflicts that are a natural (and needed) part of any healthy organization. Nor does it refer to a one-off incident or a coworker who is a jerk every now and again. These kinds of irritations, for the most part, are best thought of as normal parts of (working) life.
                                    So, what actually is considered toxic? A study by Donald Sull and his colleagues identified five attributes of a toxic culture: disrespectful, noninclusive, unethical, cutthroat, and abusive. In a recent discussion I had with two colleagues who are experts on the subject, Amy Edmondson of Harvard Business School and Constance Hadley of the Questrom School of Business, we agreed that toxicity also implies the behavior in question is both pervasive and ongoing. And that, we believe, is what makes bad behavior rise — or perhaps fall — to the level of toxic. Toxicity carries a sense of inescapability, which is part of what makes it so painful to experience at work.
                                    Undeniably negative as these attributes are, there is no absolute, uniformly accepted scale against which we can measure any of them — all five are subjective, anchored in each person’s experience. Making matters more complicated, a hybrid environment by definition means that employees are experiencing their work in very different contexts — some face-to-face, others remote — and those may vary by the day. As a result, hybrid workspaces aren’t uniform; some people may experience a hybrid environment as toxic while others do not. That does not make a toxic hybrid environment any less painful or damaging to those who experience it as such. However, it does mean that some behaviors may be toxic even as a result of well-meaning — or at least not ill-meaning — actions.
                                    When talking with executives about toxicity, I encourage them to think like social scientists, to understand the mechanisms through which hybrid working can lead to increased toxicity. Here’s what they should know.
                                    How Hybrid Work Can Lead to Toxicity
                                    My research and consulting experience has led me to think in terms of four mechanisms through which hybridity can lead to toxic behaviors.
                                    1. Remoteness changes dynamics
                                    Working hybrid means that, compared with full-time in-office work, more communication will take place via technologies like email, text, phone, or video. One of the early findings in research on the effects of technology-mediated communication was that people become more disinhibited and exhibit less self-monitoring and self-control when communicating through technology. In other words, when we talk to one another electronically, we are more likely to blurt out things that might be hurtful. Think about heated exchanges you’ve had with colleagues both in person and electronically — chances are, you were much more tempted to try to slip in a sharp quip in an email than face-to-face.
                                    This dynamic is not (necessarily) about being a nasty person. We all have moments of anger, frustration, or passion, and if handled badly, those feelings have the potential to turn toxic.
                                    In face-to-face interactions, though, the human on the other side of the conversation is far more salient to us, leading most of us to recognize the potential costs of a less-careful word and bite our tongues. The point isn’t that we shouldn’t speak our minds (if we feel that we can’t, that’s bad for psychological safety), but that we should choose our words well. While the reduced self-monitoring and self-control that come with remote interactions do not necessarily cause toxicity, they certainly make it more likely for disrespectful or abusive (two of Sull’s toxicity characteristics) comments to come out.
                                    2. Hybridity is fundamentally imbalanced
                                    Hybrid also means different people are working in different contexts. Some may be at home, while others are in the office — and those locations have undeniable differences. People in the office have greater access to resources and higher visibility, often leading to more credit and quicker promotion as a result. Remote workers, meanwhile, often feel left out and shunned. Negative as these effects may be, they are not strictly toxic if everyone is equally disadvantaged at some point. The problem is when some people (likely remote/hybrid workers) feel consistently excluded — as was the experience of one manager I recently worked with.
                                    Company policy was to allow all employees to work remotely two days a week, and the manager had allowed her team members to choose those days. She quickly discovered her team had effectively split on the basis of different (but consistent) patterns of which days people chose to come into the office. Compounding the issue, team members’ remote-work choices were heavily driven by commutes and children’s school schedules, which aligned them with demographic differences in the team. Problems arose when some team members felt they were being excluded from the discussions and meetings that occurred on the in-office days of the other group. The split led to interpersonal tensions and conflict, people feeling excluded and disrespected (two toxicity characteristics), and it ultimately resulted in turnover.
                                    3. Hybridity can reduce cohesion and trust
                                    Research shows that lack of close contact reduces connection and trust, which are key elements of a healthy culture. During the pandemic, I spoke to many employees who had started new jobs remotely, and I consistently heard that they hadn’t gotten to know their colleagues and felt disconnected. Research from Microsoft found remote working leads employees to have smaller, less-well-developed networks.
                                    Remote (and by extension hybrid) working does not necessarily mean organizations will have a weak or inconsistent culture. Take Linux as an example. Its open-source software development from day one has been carried out by a loosely structured community of developers who have never met in person, yet extensive research on the group has found it has strong social norms governing behavior. However, it is hard to deny that the group’s structure (or lack thereof) removes or impedes many of the mechanisms we traditionally use to establish, transmit, and maintain culture. Note that Linux started with a remote, dispersed culture. While many companies have embraced remote and hybrid since the pandemic started, their cultures were already established and then adjusted to handle the crisis.
                                    Culture is so important because it is the compass organizations use to eschew cutthroat and, in more extreme cases, unethical behavior. To be clear, hybridity does not inherently lead people to be more cutthroat or unethical (though one might argue the sense of distance between people makes them less aware of the negative ramifications of their actions). However, in every social system we find a range of behaviors, and culture typically helps us rein in the negative ones. On top of that, while people are less likely to exhibit toxic behaviors toward those they feel close and connected to, the distance that a remote/hybrid environment brings makes us more likely to view some of our colleagues not as “us” but as “them” — and it’s much easier to act poorly toward “them.”
                                    4. Hybridity makes it hard to resolve issues
                                    There’s one more key challenge in remote and hybrid work: We have fewer face-to-face interactions with colleagues, and research shows that it is harder to resolve disputes (like those around toxic behaviors) virtually. Think about trying to address a sensitive topic over Zoom with someone and worrying about everything from where they’re looking to how fast they reply. Are they giving me their full attention? Am I sure my sincerity is coming through over video? Was their slow response because they disagreed or are just lagging?
                                    When we’re face-to-face, we have more interpersonal tools at our disposal. We have better data, as we can more easily read facial expressions and can see off-camera behaviors. We also have better tools, as face-to-face interactions allow us to synchronously work together to resolve differences. And the propinquity effect (essentially, we like people we have more exposure to) means all of this happens from a starting point of a closer relationship.
                                    One other issue it’s important to mention is microaggressions, which some people have argued happen less often in remote settings because we’re around one another less. However, I would caution leaders and employees alike to stay vigilant for signs of microaggressions (often reflected in toxic behaviors like noninclusion) in hybrid settings. While these settings may have fewer touchpoints where microaggressions can occur, they do not remove the underpinnings of why microaggressions happen — nor do they prevent them from coming out in other outlets, such as Slack, messaging apps, or videoconferencing. In effect, hybrid work can obscure the problem without resolving it.
                                    What Leaders Can Do
                                    I advise leaders to approach toxic behaviors in hybrid work in four ways: educate, lay a foundation, have ongoing conversations, and intervene quickly.
                                    Educate employees
                                    The first step toward avoiding toxic behavior in hybrid teams is to help people learn how it can arise. You may think, “Of course they know not to be disrespectful, abusive, or noninclusive,” but that’s not the issue. Sit down with your employees and have a conversation about how these outcomes can happen as unintended consequences of hybrid work arrangements and decisions. Remind them that toxicity is about behavior — and that what matters isn’t what your intention was but how others perceive your actions. A good starting point is to ask employees to reflect on hybrid work behaviors they may have experienced as toxic (for example, feeling routinely excluded from a social group or reading comments on Slack that they found abusive or disrespectful). The goal of this step is not to identify particular issues or point fingers but rather to increase employees’ self-awareness and the number of eyes out there looking for toxic behaviors or their antecedents.
                                    Lay a foundation
                                    As Benjamin Franklin famously said, “An ounce of prevention is worth a pound of cure.” One of the most effective tools you can put in place is a culture with built-in antibodies against toxic behaviors. In particular, focus on promoting empathy and psychological safety. A culture with a core of empathy encourages employees to consider the impact of their actions on their colleagues, increasing the likelihood that employees catch themselves before behaving in a way another might find troubling. In turn, a culture that includes psychological safety is critical for those cases that empathy doesn’t prevent. We don’t always recognize the impact of our actions, and building psychological safety ensures that employees can speak up about the behaviors they perceive as toxic. Research has provided excellent practical advice for promoting both empathy and psychological safety.
                                    Have ongoing conversations
                                    Because the experience of hybrid work is different among employees and dynamic over time (someone may be in the office today, surrounded by colleagues, and at home alone tomorrow), toxicity is a moving target. The only truly effective way to manage such dynamism is with an ongoing process — and the cornerstone is repeated, ongoing conversations. I encourage hybrid teams and organizations to have periodic check-ins where everyone is encouraged to raise concerns or flag toxic experiences. There is no hard-and-fast rule for frequency, as it depends on how dynamic the organization’s hybrid environment is: The more and faster it changes, the more frequent those conversations should be. As a starting point, aim for a monthly check-in and adjust as needed. Make sure the psychological safety foundation is in place if you want people to share honestly, and treat these conversations as more than a superficial box-ticking exercise.
                                    Intervene quickly
                                    Even with a good understanding of the issues, a positive cultural foundation in place, and ongoing discussions, hybrid working may still lead to behaviors that your employees find toxic. A big problem with toxic environments is that they tend to get worse: Toxic behaviors either feed on themselves, breeding more toxicity, or cause disgruntled employees to disengage, creating new tensions due to workloads needing to be redistributed. To break the cycle, you need to not only keep an eye out for toxic behaviors but also be ready to move fast when you see them, help all parties engage in a dialogue, and work to reach a mutually acceptable solution.
                                    Let’s say you notice a situation like that of the manager whose team was split over their WFH days. In a case like that, call a team meeting and share your concerns of how the situation might feel exclusionary. It may turn out your concerns aren’t shared — but you’re still creating buy-in and ownership of the issue, making it easier to address later if it does become a problem. If, however, you’ve recognized a budding concern for some of your team members, you have a forum to discuss and collectively resolve it before it gets too far along.
                                    . . .
                                    Toxicity can be an unfortunate reality of some work environments. While hybrid work does not necessarily cause toxicity any more than in-person work does, it is important to recognize that hybrid introduces some different mechanisms through which toxicity may arise. Keeping these in mind can help leaders recognize, guard against, and eliminate toxicity when it occurs — or ideally before.


                                    test.html:31:21
                                </p>
                            </div>
                        </div>}
                    </div>
                }
                {currentTab == 2 &&
                    <div className="relative flex-grow animate__animated animate__fadeIn">
                        <InputField placeholder="Paste an article, short or long" type="text-area" onChange={() => { }} />
                        <div className="text-right">
                            <Button
                                type="tertiary"
                                showHoverAnimation={true}
                                className="py-0 pl-4 font-bold"
                                onClick={() => { }}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                }
                {!true &&
                    <div
                        className="fixed bottom-8 mx-auto right-0 left-0 flex justify-center lg:absolute lg:bottom-8 animate__animated animate__fadeInUp"
                        style={{
                            animationDelay: `0.25s`
                        }}
                    >
                        <Button
                            type="primary"
                            className="rounded-full w-min flex p-3"
                            onClick={() => { setIsPlayerOpen(true) }}
                        >
                            <span
                                className="material-icons-round text-6xl"
                            >
                                play_arrow
                            </span>
                        </Button>
                    </div>
                }
            </div >
        </>
    )
}