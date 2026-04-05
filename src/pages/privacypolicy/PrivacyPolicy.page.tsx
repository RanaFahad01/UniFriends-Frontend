import { Box, Text, Title, Anchor } from '@mantine/core';
import { BackgroundEffectsCyan } from '@/components/landingpage/BackgroundEffects/BackgroundEffectsCyan';
import { ScanlineOverlay } from '@/components/landingpage/ScanlineOverlay/ScanlineOverlay';
import { Header } from '@/components/header/Header';
import classes from './PrivacyPolicy.module.css';

export default function PrivacyPolicy() {
    return (
        <Box className={classes.page}>
            <BackgroundEffectsCyan />
            <ScanlineOverlay />
            <Header />
            <main className={classes.main}>
                <Box className={classes.container}>
                    <Title order={1} className={classes.title}>Privacy Policy</Title>
                    <div className={classes.accent} />

                    <Text className={classes.lastUpdated} size="sm" c="dimmed">
                        Last updated April 05, 2026
                    </Text>

                    <div className={classes.body}>
                        <p>
                            This Privacy Notice for UniFriends (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
                            describes how and why we might access, collect, store, use, and/or share
                            (&quot;process&quot;) your personal information when you use our services
                            (&quot;Services&quot;), including when you:
                        </p>
                        <ul>
                            <li>
                                Visit our website at{' '}
                                <Anchor href="http://www.unifriends.net" className={classes.link}>
                                    http://www.unifriends.net
                                </Anchor>{' '}
                                or any website of ours that links to this Privacy Notice
                            </li>
                            <li>Engage with us in other related ways, including any marketing or events</li>
                        </ul>
                        <p>
                            <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you
                            understand your privacy rights and choices. We are responsible for making decisions
                            about how your personal information is processed. If you do not agree with our
                            policies and practices, please do not use our Services. If you still have any
                            questions or concerns, please contact us at{' '}
                            <Anchor href="mailto:ranafahadBH@gmail.com" className={classes.link}>
                                ranafahadBH@gmail.com
                            </Anchor>.
                        </p>

                        {/* SUMMARY OF KEY POINTS */}
                        <Title order={2} className={classes.sectionHeading}>Summary of Key Points</Title>
                        <p className={classes.inShort}>
                            This summary provides key points from our Privacy Notice, but you can find out
                            more details about any of these topics by clicking the link following each key
                            point or by using our table of contents below to find the section you are looking for.
                        </p>
                        <p>
                            <strong>What personal information do we process?</strong> When you visit, use, or
                            navigate our Services, we may process personal information depending on how you
                            interact with us and the Services, the choices you make, and the products and
                            features you use. Learn more about{' '}
                            <Anchor href="#section-1" className={classes.link}>personal information you disclose to us</Anchor>.
                        </p>
                        <p>
                            <strong>Do we process any sensitive personal information?</strong> Some of the
                            information may be considered &quot;special&quot; or &quot;sensitive&quot; in certain
                            jurisdictions, for example your racial or ethnic origins, sexual orientation, and
                            religious beliefs. We do not process sensitive personal information.
                        </p>
                        <p>
                            <strong>Do we collect any information from third parties?</strong> We do not collect
                            any information from third parties.
                        </p>
                        <p>
                            <strong>How do we process your information?</strong> We process your information to
                            provide, improve, and administer our Services, communicate with you, for security
                            and fraud prevention, and to comply with law. We may also process your information
                            for other purposes with your consent. We process your information only when we have
                            a valid legal reason to do so. Learn more about{' '}
                            <Anchor href="#section-2" className={classes.link}>how we process your information</Anchor>.
                        </p>
                        <p>
                            <strong>In what situations and with which parties do we share personal information?</strong>{' '}
                            We may share information in specific situations and with specific third parties.
                            Learn more about{' '}
                            <Anchor href="#section-4" className={classes.link}>when and with whom we share your personal information</Anchor>.
                        </p>
                        <p>
                            <strong>How do we keep your information safe?</strong> We have adequate
                            organizational and technical processes and procedures in place to protect your
                            personal information. However, no electronic transmission over the internet or
                            information storage technology can be guaranteed to be 100% secure, so we cannot
                            promise or guarantee that hackers, cybercriminals, or other unauthorized third
                            parties will not be able to defeat our security and improperly collect, access,
                            steal, or modify your information. Learn more about{' '}
                            <Anchor href="#section-8" className={classes.link}>how we keep your information safe</Anchor>.
                        </p>
                        <p>
                            <strong>What are your rights?</strong> Depending on where you are located
                            geographically, the applicable privacy law may mean you have certain rights
                            regarding your personal information. Learn more about{' '}
                            <Anchor href="#section-9" className={classes.link}>your privacy rights</Anchor>.
                        </p>
                        <p>
                            <strong>How do you exercise your rights?</strong> The easiest way to exercise your
                            rights is by submitting a{' '}
                            <Anchor
                                href="https://app.termly.io/notify/ad6db498-e7c4-4a2b-8e7b-0c068dfa6fa1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                data subject access request
                            </Anchor>
                            , or by contacting us. We will consider and act upon any request in accordance with
                            applicable data protection laws.
                        </p>
                        <p>
                            Want to learn more about what we do with any information we collect?{' '}
                            <Anchor href="#section-1" className={classes.link}>Review the Privacy Notice in full</Anchor>.
                        </p>

                        {/* TABLE OF CONTENTS */}
                        <Title order={2} className={classes.sectionHeading}>Table of Contents</Title>
                        <ol className={classes.tocList}>
                            <li><Anchor href="#section-1" className={classes.link}>1. What Information Do We Collect?</Anchor></li>
                            <li><Anchor href="#section-2" className={classes.link}>2. How Do We Process Your Information?</Anchor></li>
                            <li><Anchor href="#section-3" className={classes.link}>3. What Legal Bases Do We Rely On to Process Your Personal Information?</Anchor></li>
                            <li><Anchor href="#section-4" className={classes.link}>4. When and With Whom Do We Share Your Personal Information?</Anchor></li>
                            <li><Anchor href="#section-5" className={classes.link}>5. Do We Use Cookies and Other Tracking Technologies?</Anchor></li>
                            <li><Anchor href="#section-6" className={classes.link}>6. How Do We Handle Your Social Logins?</Anchor></li>
                            <li><Anchor href="#section-7" className={classes.link}>7. How Long Do We Keep Your Information?</Anchor></li>
                            <li><Anchor href="#section-8" className={classes.link}>8. How Do We Keep Your Information Safe?</Anchor></li>
                            <li><Anchor href="#section-9" className={classes.link}>9. What Are Your Privacy Rights?</Anchor></li>
                            <li><Anchor href="#section-10" className={classes.link}>10. Controls for Do-Not-Track Features</Anchor></li>
                            <li><Anchor href="#section-11" className={classes.link}>11. Do We Make Updates to This Notice?</Anchor></li>
                            <li><Anchor href="#section-12" className={classes.link}>12. How Can You Contact Us About This Notice?</Anchor></li>
                            <li><Anchor href="#section-13" className={classes.link}>13. How Can You Review, Update, or Delete the Data We Collect From You?</Anchor></li>
                        </ol>

                        {/* SECTION 1 */}
                        <Title order={2} className={classes.sectionHeading} id="section-1">
                            1. What Information Do We Collect?
                        </Title>
                        <Title order={3} className={classes.subHeading}>
                            Personal information you disclose to us
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> We collect personal information that you provide to us.
                        </p>
                        <p>
                            We collect personal information that you voluntarily provide to us when you register
                            on the Services, express an interest in obtaining information about us or our
                            products and Services, when you participate in activities on the Services, or
                            otherwise when you contact us.
                        </p>
                        <p>
                            <strong>Personal Information Provided by You.</strong> The personal information that
                            we collect depends on the context of your interactions with us and the Services, the
                            choices you make, and the products and features you use. The personal information we
                            collect may include the following:
                        </p>
                        <ul>
                            <li>names</li>
                            <li>email addresses</li>
                            <li>usernames</li>
                            <li>profile pictures</li>
                        </ul>
                        <p>
                            <strong>Sensitive Information.</strong> We do not process sensitive information.
                        </p>
                        <p>
                            <strong>Social Media Login Data.</strong> We may provide you with the option to
                            register with us using your existing social media account details, like your
                            Facebook, X, or other social media account. If you choose to register in this way,
                            we will collect certain profile information about you from the social media provider,
                            as described in the section called{' '}
                            &quot;<Anchor href="#section-6" className={classes.link}>How Do We Handle Your Social Logins?</Anchor>&quot; below.
                        </p>
                        <p>
                            All personal information that you provide to us must be true, complete, and accurate,
                            and you must notify us of any changes to such personal information.
                        </p>
                        <Title order={3} className={classes.subHeading}>Google API</Title>
                        <p>
                            Our use of information received from Google APIs will adhere to{' '}
                            <Anchor
                                href="https://developers.google.com/terms/api-services-user-data-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                Google API Services User Data Policy
                            </Anchor>
                            , including the Limited Use requirements.
                        </p>

                        {/* SECTION 2 */}
                        <Title order={2} className={classes.sectionHeading} id="section-2">
                            2. How Do We Process Your Information?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> We process your information to provide, improve, and
                            administer our Services, communicate with you, for security and fraud prevention,
                            and to comply with law. We may also process your information for other purposes with
                            your consent.
                        </p>
                        <p>
                            We process your personal information for a variety of reasons, depending on how you
                            interact with our Services, including:
                        </p>
                        <ul>
                            <li>
                                <strong>To facilitate account creation and authentication and otherwise manage
                                    user accounts.</strong> We may process your information so you can create and log
                                in to your account, as well as keep your account in working order.
                            </li>
                            <li>
                                <strong>To enable user-to-user communications.</strong> We may process your
                                information if you choose to use any of our offerings that allow for communication
                                with another user.
                            </li>
                            <li>
                                <strong>To save or protect an individual&apos;s vital interest.</strong> We may
                                process your information when necessary to save or protect an individual&apos;s
                                vital interest, such as to prevent harm.
                            </li>
                            <li>
                                <strong>To make a public profile of the user.</strong> Each user has a public
                                profile made by themselves that is visible to other users. Those profiles use the
                                username and profile picture given by the user.
                            </li>
                        </ul>

                        {/* SECTION 3 */}
                        <Title order={2} className={classes.sectionHeading} id="section-3">
                            3. What Legal Bases Do We Rely On to Process Your Information?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> We only process your personal information when we believe
                            it is necessary and we have a valid legal reason (i.e., legal basis) to do so under
                            applicable law, like with your consent, to comply with laws, to provide you with
                            services to enter into or fulfill our contractual obligations, to protect your
                            rights, or to fulfill our legitimate business interests.
                        </p>
                        <p>
                            The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the
                            valid legal bases we rely on in order to process your personal information. As such,
                            we may rely on the following legal bases to process your personal information:
                        </p>
                        <ul>
                            <li>
                                <strong>Consent.</strong> We may process your information if you have given us
                                permission (i.e., consent) to use your personal information for a specific
                                purpose. You can withdraw your consent at any time. Learn more about{' '}
                                <Anchor href="#withdrawing-consent" className={classes.link}>withdrawing your consent</Anchor>.
                            </li>
                            <li>
                                <strong>Performance of a Contract.</strong> We may process your personal
                                information when we believe it is necessary to fulfill our contractual obligations
                                to you, including providing our Services or at your request prior to entering into
                                a contract with you.
                            </li>
                            <li>
                                <strong>Legal Obligations.</strong> We may process your information where we
                                believe it is necessary for compliance with our legal obligations, such as to
                                cooperate with a law enforcement body or regulatory agency, exercise or defend our
                                legal rights, or disclose your information as evidence in litigation in which we
                                are involved.
                            </li>
                            <li>
                                <strong>Vital Interests.</strong> We may process your information where we believe
                                it is necessary to protect your vital interests or the vital interests of a third
                                party, such as situations involving potential threats to the safety of any person.
                            </li>
                        </ul>

                        {/* SECTION 4 */}
                        <Title order={2} className={classes.sectionHeading} id="section-4">
                            4. When and With Whom Do We Share Your Personal Information?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> We may share information in specific situations described
                            in this section and/or with the following third parties.
                        </p>
                        <p>
                            We may need to share your personal information in the following situations:
                        </p>
                        <ul>
                            <li>
                                <strong>Business Transfers.</strong> We may share or transfer your information in
                                connection with, or during negotiations of, any merger, sale of company assets,
                                financing, or acquisition of all or a portion of our business to another company.
                            </li>
                            <li>
                                <strong>Other Users.</strong> When you share personal information (for example, by
                                posting comments, contributions, or other content to the Services) or otherwise
                                interact with public areas of the Services, such personal information may be
                                viewed by all users and may be publicly made available outside the Services in
                                perpetuity. If you interact with other users of our Services and register for our
                                Services through a social network (such as Facebook), your contacts on the social
                                network will see your name, profile photo, and descriptions of your activity.
                                Similarly, other users will be able to view descriptions of your activity,
                                communicate with you within our Services, and view your profile.
                            </li>
                        </ul>

                        {/* SECTION 5 */}
                        <Title order={2} className={classes.sectionHeading} id="section-5">
                            5. Do We Use Cookies and Other Tracking Technologies?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> We may use cookies and other tracking technologies to
                            collect and store your information.

                            We use a single strictly necessary cookie to manage user authentication sessions. This cookie is essential for the website to function and cannot be disabled. It does not track you or collect any personal information beyond keeping you logged in.
                        </p>
                        <p>
                            We may use cookies and similar tracking technologies (like web beacons and pixels) to
                            gather information when you interact with our Services. Some online tracking
                            technologies help us maintain the security of our Services and your account, prevent
                            crashes, fix bugs, save your preferences, and assist with basic site functions.
                        </p>

                        <p>
                            We use a single strictly necessary cookie to manage user authentication sessions. This cookie is essential for the website to function and cannot be disabled. It does not track you or collect any personal information beyond keeping you logged in.

                        </p>


                        {/* SECTION 6 */}
                        <Title order={2} className={classes.sectionHeading} id="section-6">
                            6. How Do We Handle Your Social Logins?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> If you choose to register or log in to our Services using
                            a social media account, we may have access to certain information about you.
                        </p>
                        <p>
                            Our Services offer you the ability to register and log in using your third-party
                            social media account details (like your Facebook or X logins). Where you choose to do
                            this, we will receive certain profile information about you from your social media
                            provider. The profile information we receive may vary depending on the social media
                            provider concerned, but will often include your name, email address, friends list,
                            and profile picture, as well as other information you choose to make public on such a
                            social media platform.
                        </p>
                        <p>
                            We will use the information we receive only for the purposes that are described in
                            this Privacy Notice or that are otherwise made clear to you on the relevant Services.
                            Please note that we do not control, and are not responsible for, other uses of your
                            personal information by your third-party social media provider. We recommend that you
                            review their privacy notice to understand how they collect, use, and share your
                            personal information, and how you can set your privacy preferences on their sites and
                            apps.
                        </p>

                        {/* SECTION 7 */}
                        <Title order={2} className={classes.sectionHeading} id="section-7">
                            7. How Long Do We Keep Your Information?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> We keep your information for as long as necessary to
                            fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
                        </p>
                        <p>
                            We will only keep your personal information for as long as it is necessary for the
                            purposes set out in this Privacy Notice, unless a longer retention period is required
                            or permitted by law (such as tax, accounting, or other legal requirements). No
                            purpose in this notice will require us keeping your personal information for longer
                            than the period of time in which users have an account with us.
                        </p>
                        <p>
                            When we have no ongoing legitimate business need to process your personal
                            information, we will either delete or anonymize such information, or, if this is not
                            possible (for example, because your personal information has been stored in backup
                            archives), then we will securely store your personal information and isolate it from
                            any further processing until deletion is possible.
                        </p>

                        {/* SECTION 8 */}
                        <Title order={2} className={classes.sectionHeading} id="section-8">
                            8. How Do We Keep Your Information Safe?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> We aim to protect your personal information through a
                            system of organizational and technical security measures.
                        </p>
                        <p>
                            We have implemented appropriate and reasonable technical and organizational security
                            measures designed to protect the security of any personal information we process.
                            However, despite our safeguards and efforts to secure your information, no electronic
                            transmission over the Internet or information storage technology can be guaranteed to
                            be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or
                            other unauthorized third parties will not be able to defeat our security and
                            improperly collect, access, steal, or modify your information. Although we will do
                            our best to protect your personal information, transmission of personal information
                            to and from our Services is at your own risk. You should only access the Services
                            within a secure environment.
                        </p>

                        {/* SECTION 9 */}
                        <Title order={2} className={classes.sectionHeading} id="section-9">
                            9. What Are Your Privacy Rights?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> In some regions, such as the European Economic Area (EEA),
                            United Kingdom (UK), and Switzerland, you have rights that allow you greater access to
                            and control over your personal information. You may review, change, or terminate your
                            account at any time, depending on your country, province, or state of residence.
                        </p>
                        <p>
                            In some regions (like the EEA, UK, and Switzerland), you have certain rights under
                            applicable data protection laws. These may include the right (i) to request access
                            and obtain a copy of your personal information, (ii) to request rectification or
                            erasure; (iii) to restrict the processing of your personal information; (iv) if
                            applicable, to data portability; and (v) not to be subject to automated
                            decision-making. In certain circumstances, you may also have the right to object to
                            the processing of your personal information. You can make such a request by
                            contacting us by using the contact details provided in the section{' '}
                            &quot;<Anchor href="#section-12" className={classes.link}>How Can You Contact Us About This Notice?</Anchor>&quot; below.
                        </p>
                        <p>
                            We will consider and act upon any request in accordance with applicable data
                            protection laws. If you are located in the EEA or UK and you believe we are
                            unlawfully processing your personal information, you also have the right to complain
                            to your{' '}
                            <Anchor
                                href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                Member State data protection authority
                            </Anchor>{' '}
                            or{' '}
                            <Anchor
                                href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                UK data protection authority
                            </Anchor>.
                        </p>
                        <p>
                            If you are located in Switzerland, you may contact the{' '}
                            <Anchor
                                href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                Federal Data Protection and Information Commissioner
                            </Anchor>.
                        </p>
                        <p id="withdrawing-consent">
                            <strong>Withdrawing your consent:</strong> If we are relying on your consent to
                            process your personal information, you have the right to withdraw your consent at any
                            time. You can withdraw your consent at any time by contacting us by using the contact
                            details provided in the section{' '}
                            &quot;<Anchor href="#section-12" className={classes.link}>How Can You Contact Us About This Notice?</Anchor>&quot; below.
                        </p>
                        <p>
                            However, please note that this will not affect the lawfulness of the processing
                            before its withdrawal nor, will it affect the processing of your personal information
                            conducted in reliance on lawful processing grounds other than consent.
                        </p>
                        <Title order={3} className={classes.subHeading}>Account Information</Title>
                        <p>
                            If you would at any time like to review or change the information in your account or
                            terminate your account, you can:
                        </p>
                        <ul>
                            <li>Log in to your account settings and update your user account.</li>
                        </ul>
                        <p>
                            Upon your request to terminate your account, we will deactivate or delete your
                            account and information from our active databases. However, we may retain some
                            information in our files to prevent fraud, troubleshoot problems, assist with any
                            investigations, enforce our legal terms and/or comply with applicable legal
                            requirements.
                        </p>
                        <p>
                            <strong>Cookies and similar technologies:</strong> Most Web browsers are set to
                            accept cookies by default. If you prefer, you can usually choose to set your browser
                            to remove cookies and to reject cookies. If you choose to remove cookies or reject
                            cookies, this could affect certain features or services of our Services.
                        </p>
                        <p>
                            If you have questions or comments about your privacy rights, you may email us at{' '}
                            <Anchor href="mailto:ranafahadBH@gmail.com" className={classes.link}>
                                ranafahadBH@gmail.com
                            </Anchor>.
                        </p>

                        {/* SECTION 10 */}
                        <Title order={2} className={classes.sectionHeading} id="section-10">
                            10. Controls for Do-Not-Track Features
                        </Title>
                        <p>
                            Most web browsers and some mobile operating systems and mobile applications include a
                            Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your
                            privacy preference not to have data about your online browsing activities monitored
                            and collected. At this stage, no uniform technology standard for recognizing and
                            implementing DNT signals has been finalized. As such, we do not currently respond to
                            DNT browser signals or any other mechanism that automatically communicates your
                            choice not to be tracked online. If a standard for online tracking is adopted that we
                            must follow in the future, we will inform you about that practice in a revised
                            version of this Privacy Notice.
                        </p>

                        {/* SECTION 11 */}
                        <Title order={2} className={classes.sectionHeading} id="section-11">
                            11. Do We Make Updates to This Notice?
                        </Title>
                        <p className={classes.inShort}>
                            <strong>In Short:</strong> Yes, we will update this notice as necessary to stay
                            compliant with relevant laws.
                        </p>
                        <p>
                            We may update this Privacy Notice from time to time. The updated version will be
                            indicated by an updated &quot;Revised&quot; date at the top of this Privacy Notice.
                            If we make material changes to this Privacy Notice, we may notify you either by
                            prominently posting a notice of such changes or by directly sending you a
                            notification. We encourage you to review this Privacy Notice frequently to be
                            informed of how we are protecting your information.
                        </p>

                        {/* SECTION 12 */}
                        <Title order={2} className={classes.sectionHeading} id="section-12">
                            12. How Can You Contact Us About This Notice?
                        </Title>
                        <p>
                            If you have questions or comments about this notice, you may email us at{' '}
                            <Anchor href="mailto:ranafahadBH@gmail.com" className={classes.link}>
                                ranafahadBH@gmail.com
                            </Anchor>{' '}
                            or contact us by post at:
                        </p>
                        <div className={classes.contactBlock}>
                            <Text size="sm">UniFriends</Text>
                            <Text size="sm">Debrecen</Text>
                            <Text size="sm">Debrecen 4000</Text>
                            <Text size="sm">Hungary</Text>
                        </div>

                        {/* SECTION 13 */}
                        <Title order={2} className={classes.sectionHeading} id="section-13">
                            13. How Can You Review, Update, or Delete the Data We Collect From You?
                        </Title>
                        <p>
                            Based on the applicable laws of your country, you may have the right to request
                            access to the personal information we collect from you, details about how we have
                            processed it, correct inaccuracies, or delete your personal information. You may also
                            have the right to withdraw your consent to our processing of your personal
                            information. These rights may be limited in some circumstances by applicable law. To
                            request to review, update, or delete your personal information, please fill out and
                            submit a{' '}
                            <Anchor
                                href="https://app.termly.io/notify/ad6db498-e7c4-4a2b-8e7b-0c068dfa6fa1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                data subject access request
                            </Anchor>.
                        </p>

                        <Text size="xs" c="dimmed" mt="xl" ta="center">
                            This Privacy Policy was created using Termly&apos;s Privacy Policy Generator.
                        </Text>
                    </div>
                </Box>
            </main>
        </Box>
    );
}
