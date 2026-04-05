import { useNavigation } from 'react-router-dom';
import { useNProgress } from '@tanem/react-nprogress';
import classes from './NavigationProgress.module.css';

export function NavigationProgress() {
    const navigation = useNavigation();
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating: navigation.state !== 'idle',
    });

    return (
        <div
            className={classes.container}
            style={{
                opacity: isFinished ? 0 : 1,
                transition: `opacity ${animationDuration}ms linear`,
            }}
        >
            <div
                className={classes.bar}
                style={{
                    marginLeft: `${(-1 + progress) * 100}%`,
                    transition: `margin-left ${animationDuration}ms linear`,
                }}
            />
        </div>
    );
}
